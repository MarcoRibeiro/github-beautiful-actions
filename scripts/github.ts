import { Octokit } from "@octokit/rest";

const github = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function createTask(title: string, body: string) {
  return github.issues.create({
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    title,
    body,
    labels: ["task"],
  });
}
