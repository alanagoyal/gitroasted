"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitHubLogoIcon, CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const loadingRoasts = [ 
  "Starting up a Browserbase session...",
  "Analyzing your 'professional' selfie taken in a gaming chair...",
  "Counting how many times you've forked 'awesome-lists'...",
  "Measuring the dust on your abandoned side projects...",
  "Calculating the ratio of README updates to actual code...",
  "Scanning commit messages for 'fixed typo' and 'minor changes'...",
  "Evaluating your Stack Overflow copy-paste efficiency...",
  "Counting how many times you've starred your own repos...",
  "Analyzing your creative ways of avoiding unit tests...",
  "Measuring the staleness of your dependencies...",
  "Calculating your 'it works on my machine' incidents...",
];

// Define the validation schema
const formSchema = z.object({
  githubUrl: z
    .string()
    .min(1, "Input is required")
    .regex(
      /^(https:\/\/github\.com\/[a-zA-Z0-9-]+|[a-zA-Z0-9-]+)$/,
      "Invalid input. Must be a valid GitHub URL or username."
    ),
});

// Define the form schema type
type FormValues = z.infer<typeof formSchema>

const createTweetText = (username: string, roast: string) => {
  return `🔥 Just got roasted on GitRoasted:\n\n${roast}\n\nGet roasted at https://roasted.basecase.vc`;
};

export function Roaster() {
  // Initialize form with useForm hook
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubUrl: "",
    },
  });

  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingRoast, setLoadingRoast] = useState("");
  const roastRef = useRef<HTMLParagraphElement>(null);
  const [copied, setCopied] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      let index = 0;
      setLoadingRoast(loadingRoasts[index]);
      index++;
      interval = setInterval(() => {
        setLoadingRoast(loadingRoasts[index]);
        index = (index + 1) % (loadingRoasts.length - 1) + 1;
      }, 3000);
    } else {
      setLoadingRoast("");
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (roast && roastRef.current) {
      const text = roastRef.current;
      text.innerHTML = roast
        .split("")
        .map(
          (char) =>
            `<span class="inline-block transition-transform duration-300 ease-in-out transform hover:scale-125 hover:-translate-y-1">${char}</span>`
        )
        .join("");
    }
  }, [roast]);

  const extractUsername = (input: string) => {
    if (input.startsWith("http")) {
      const match = input.match(/github\.com\/([^/]+)/);
      return match ? match[1] : null;
    }
    return input; // Assume input is a username if it doesn't start with "http"
  };

  // Modify onSubmit to use form values
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setRoast("");

    const extractedUsername = extractUsername(data.githubUrl);
    if (!extractedUsername) {
      setRoast("Invalid input. Please enter a valid GitHub URL or username.");
      setLoading(false);
      return;
    }

    setUsername(extractedUsername);

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ githubUrl: `https://github.com/${extractedUsername}` }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch roast");
      }

      const data = await response.json();
      setRoast(data.roast);
    } catch (error) {
      console.error("Error:", error);
      setRoast("Failed to generate roast. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (roastRef.current) {
      try {
        await navigator.clipboard.writeText(roastRef.current.innerText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleTweetShare = () => {
    if (roast) {
      const tweetText = createTweetText(username, roastRef.current?.innerText || roast);
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(tweetUrl, '_blank');
    }
  };

  const backgroundImage = '/fireplace.gif';

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24"
      style={{
        backgroundColor: 'black',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex-grow flex items-center justify-center w-full py-4">
        <Card className="w-full max-w-lg mx-4">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-left">
              GitRoasted
            </CardTitle>
            <CardDescription className="text-left text-sm sm:text-base">
              Paste your GitHub profile below to get roasted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <GitHubLogoIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input 
                            placeholder="GitHub username or URL"
                            className="pl-8 text-base placeholder:text-sm"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Roasting..." : "Roast Me!"}
                </Button>
              </form>
              {loading && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <p className="text-gray-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {loadingRoast}
                    </p>
                  </div>
                </div>
              )}
              {roast && !loading && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">
                      @{username}
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleTweetShare}
                        aria-label="Share on X (Twitter)"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                          />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        aria-label={copied ? "Copied" : "Copy roast"}
                      >
                        {copied ? (
                          <CheckIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <CopyIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <p
                    ref={roastRef}
                    className="text-sm text-gray-700 cursor-default flex-grow"
                    aria-live="polite"
                    dangerouslySetInnerHTML={{ __html: roast }}
                  ></p>
                </div>
              )}
            </Form>
          </CardContent>
        </Card>
      </div>
      <footer className="text-xs sm:text-sm text-gray-400 mt-4">
        built by <a href="https://basecase.vc" className="underline">basecase</a> 🤝🏼 powered by <a href="https://browserbase.com" className="underline">browserbase</a>
      </footer>
    </main>
  );
}
