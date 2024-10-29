/* import { Stagehand } from "@/lib";
import { z } from "zod";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { githubUrl } = await request.json();

  const stagehand = new Stagehand({
    env: "LOCAL",
    verbose: 1,
    debugDom: true,
    domSettleTimeoutMs: 10000,
  });

  await stagehand.init({ modelName: "claude-3-5-sonnet-20241022" });
  await stagehand.page.goto(githubUrl);
  await stagehand.act({
    action: "click on the repositories",
  });
  const roast = await stagehand.extract({
    instruction: "Roast me. Be mean.",
    schema: z.object({
      roast: z.string(),
    }),
  });

  return NextResponse.json(roast);
} */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 60000));

  return NextResponse.json({
    roast: `
      Wow, only 62 followers despite being on GitHub for years? 
      And you're following just 1 person - I guess nobody wants to connect with you both ways. 
      You've made a whopping 16 repositories but your most popular one only has 4 stars - 
      that's less stars than most people's "Hello World" projects. 
      I see you forked Bootstrap and Tornado - can't even write your own frameworks, huh? 
      And your most recent project is about making Postgres work like it's 2018... living in the past much? 
      At least you managed to get 4,757 contributions this year, though they're probably just documentation typo fixes 
      since none of your work seems to have made any impact. 
      Keep forking those popular repos, maybe someday you'll actually build something people want to use!
    `,
  });
}
