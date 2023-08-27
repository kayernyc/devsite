import { EditorPostOutput } from '@/_custom-types/editorTypes';

export const PostMetaData = (post: EditorPostOutput) => {
  const { published, time_created, time_modified } = post;

  const timeString = (label: string, time: string) => {
    const timeCreated = new Date(parseInt(time, 10));
    return (
      <div>
        {label}: {timeCreated.toLocaleDateString()}
      </div>
    );
  };

  return (
    <>
      <div>
        published: <strong>{published ? 'true' : 'false'}</strong>
      </div>
      {time_created && timeString('Date created', time_created)}
      {time_modified && timeString('Date modified', time_modified)}
    </>
  );
};
