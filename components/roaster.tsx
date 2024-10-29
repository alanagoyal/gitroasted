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
import { toast } from "@/hooks/use-toast";

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

export function Roaster() {
  const [githubUrl, setGithubUrl] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRoast("");

    const extractedUsername = extractUsername(githubUrl);
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
        toast({ description: "Copied to clipboard" });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const backgroundImage = '/fireplace.gif';

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{
        backgroundColor: 'black',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex-grow flex items-center justify-center w-full">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-left">
              GitHub Profile Roaster
            </CardTitle>
            <CardDescription className="text-left">
              Paste your GitHub profile below to get roasted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <GitHubLogoIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="GitHub username or URL"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Roasting..." : "Roast Me!"}
              </Button>
            </form>
            {loading && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <div className="flex items-center space-x-2 overflow-hidden">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <p className="text-gray-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {loadingRoast}
                  </p>
                </div>
              </div>
            )}
            {roast && !loading && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">
                    @{username}
                  </h2>
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
                <p
                  ref={roastRef}
                  className="text-sm text-gray-700 cursor-default flex-grow"
                  aria-live="polite"
                  dangerouslySetInnerHTML={{ __html: roast }}
                ></p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <footer className="text-sm text-gray-400">
        built with by <a href="https://basecase.vc" className="underline">basecase</a> 🤝🏼 powered by <a href="https://browserbase.com" className="underline">browserbase</a>
      </footer>
    </main>
  );
}
