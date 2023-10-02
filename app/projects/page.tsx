import { getAllAndById } from '@api/getPosts';

import { AllProjectsRender } from './all-projects-render';

export const metadata = {
  title: 'Activity collection',
  description: 'life',
};
const { getAllPosts } = getAllAndById();

export default async function AllProjects() {
  const posts = await getAllPosts();
  const projects = posts.filter((post) => {
    const { post_tags } = post;
    return post_tags.includes('project');
  });

  return <AllProjectsRender posts={projects} />;
}
