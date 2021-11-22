import { Octokit } from '@octokit/core';
import { getGithubToken } from './firebase';

const defaultConfig = { owner: 'electinth', repo: 'dream-constitution' };

export type WorkflowId = 'staging.yaml' | 'production.yaml';

export interface WorkflowRun {
  id: number;
  name?: string | null;
  status: string | null;
  conclusion: string | null;
  createdAt: Date;
}

let octokit: Octokit;

export const initOctokit = async () => {
  octokit = new Octokit({ auth: await getGithubToken() });
};

export const getLatestWorkflowRun = async (): Promise<WorkflowRun[]> => {
  if (!octokit) await initOctokit();

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
  if (!octokit) await initOctokit();

  await octokit.request(
    'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
    { ...defaultConfig, workflow_id, ref: 'main' }
  );
};
