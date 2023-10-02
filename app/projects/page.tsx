import { getAllAndById } from '@api/getPosts';

import { AllPostsByCatRender } from '../_components/all-posts-by-cat-render';

export const metadata = {
  title: 'Projects',
  description: 'personal projects',
};
const { getAllPosts } = getAllAndById();

export default async function AllProjects() {
  const posts = await getAllPosts();
  const projects = posts.filter((post) => {
    const { post_tags } = post;
    return post_tags.includes('project');
  });

  return (
    <main>
      <section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
        obcaecati iure ut sequi. Veritatis tenetur nulla accusamus ab quod
        maiores eius provident, adipisci esse eaque modi quaerat, repellendus
        iste excepturi?
      </section>
      <h2>All Projects</h2>
      <AllPostsByCatRender posts={projects} directory="projects" />;
    </main>
  );
}
