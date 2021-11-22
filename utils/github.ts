import { Octokit } from '@octokit/core';

const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_API_KEY });

const defaultConfig = { owner: 'electinth', repo: 'dream-constitution' };

export type WorkflowId = 'staging.yaml' | 'production.yaml';

export interface WorkflowRun {
  id: number;
  name?: string | null;
  status: string | null;
  conclusion: string | null;
  createdAt: Date;
}

export const getLatestWorkflowRun = async (): Promise<WorkflowRun[]> => {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/actions/runs',
    { ...defaultConfig, per_page: 5 }
  );

  return data.workflow_runs.map(
    ({ id, name, status, conclusion, created_at }) => ({
      id: id,
      name,
      status,
      conclusion,
      createdAt: new Date(created_at),
    })
  );
};

export const dispatchWorkflow = async (
  workflow_id: WorkflowId
): Promise<void> => {
  await octokit.request(
    'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
    { ...defaultConfig, workflow_id, ref: 'main' }
  );
};
