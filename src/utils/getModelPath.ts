import { ProjectType } from "@/types/ProjectType";

export function getModelPath(projet: ProjectType) {
    const title = projet.title.replace(/\s+/g, '-').toLowerCase();
    return `/models/${title}.glb`;
}