import { FolderKanban } from "lucide-react";
import { sampleData } from "@/content/sample-data";
import { StatusBadge } from "@/components/visuals/StatusBadge";
import { UiFrame } from "@/components/visuals/UiFrame";
import { VisualFigure } from "@/components/visuals/VisualFigure";

export function ProjectsVisual() {
  return (
    <VisualFigure description="Illustrative project list with stages and progress">
      <UiFrame>
        <div className="ui-heading-row">
          <div>
            <span className="ui-kicker">Workspace</span>
            <h4>{sampleData.labels.projects}</h4>
          </div>
          <span className="ui-icon-button">
            <FolderKanban aria-hidden="true" size={16} />
          </span>
        </div>
        <div className="project-rows">
          {sampleData.projects.map((project) => (
            <div className="project-row" key={project.name}>
              <span className="project-row__icon">
                <FolderKanban aria-hidden="true" size={15} />
              </span>
              <div className="project-row__body">
                <strong>{project.name}</strong>
                <span className="project-progress">
                  <i
                    className={`project-progress__fill project-progress__fill--${project.progress}`}
                  />
                </span>
              </div>
              <StatusBadge
                tone={project.stage === "Planning" ? "neutral" : "success"}
              >
                {project.stage}
              </StatusBadge>
            </div>
          ))}
        </div>
      </UiFrame>
    </VisualFigure>
  );
}
