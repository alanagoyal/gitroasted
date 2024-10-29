import { Stagehand } from "@browserbasehq/stagehand";
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
  const roast = await stagehand.extract({
    instruction: "Roast me. Be mean.",
    schema: z.object({
      roast: z.string(),
    }),
  });

  return NextResponse.json(roast);
}