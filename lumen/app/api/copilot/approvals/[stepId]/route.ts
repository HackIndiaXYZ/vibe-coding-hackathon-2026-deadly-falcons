import { NextRequest, NextResponse } from "next/server";

/**
 * Approvals — frontend-only stub.
 * In a full build this would resolve a pending step in the agent runtime.
 * For the demo, we just acknowledge the user's choice.
 */
export async function POST(_req: NextRequest, { params }: { params: { stepId: string } }) {
  return NextResponse.json({ ok: true, stepId: params.stepId });
}
