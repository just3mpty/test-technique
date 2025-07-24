import { FC } from 'react';
import { ProjectType } from '@/types/ProjectType';
// import Scene from './3D/Scene';

type ProjectProps = {
  projet: ProjectType;
  modelPath: string;
};

const Project: FC<ProjectProps> = ({ projet, modelPath }) => (
  <article className='project-card'>
    <h2>{projet?.title}</h2>
    <p>{projet?.description}</p>
    {/* <Scene modelRef={modelPath} /> */}
    <div>
      {projet?.tags?.map((t) => (
        <span key={t.tag}>{t.tag}</span>
      ))}
    </div>
  </article>
);

export default Project;
