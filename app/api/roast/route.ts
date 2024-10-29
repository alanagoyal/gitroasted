import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { githubUrl } = await request.json();

  const stagehand = new Stagehand({
    env: "BROWSERBASE",
    verbose: 1,
    debugDom: true,
    domSettleTimeoutMs: 10000,
  });

  await stagehand.init({ modelName: "gpt-4o-mini" });
  await stagehand.page.goto(githubUrl);
  const roast = await stagehand.extract({
    instruction: "Roast me. Be mean.",
    schema: z.object({
      roast: z.string(),
    }),
  });

  return NextResponse.json(roast);
}