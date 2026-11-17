type WorkflowNode = {
  title: string;
  detail: string;
};

type WorkflowIllustrationProps = {
  label: string;
  source: WorkflowNode;
  nodes: readonly WorkflowNode[];
  className?: string;
};

export function WorkflowIllustration({
  label,
  source,
  nodes,
  className = "",
}: WorkflowIllustrationProps) {
  return (
    <figure
      className={`workflow-illustration ${className}`.trim()}
    >
      <figcaption className="workflow-illustration__label">
        <span className="workflow-illustration__label-mark" aria-hidden="true" />
        {label}
      </figcaption>
      <div className="workflow-map">
        <div className="workflow-map__source">
          <span className="workflow-map__source-index" aria-hidden="true">01</span>
          <div>
            <p className="workflow-map__title">{source.title}</p>
            <p>{source.detail}</p>
          </div>
          <span className="workflow-map__source-tag">ONE RECORD</span>
        </div>
        <ol className="workflow-map__branches">
          {nodes.map((node, index) => (
            <li key={`${node.title}-${index}`}>
              <span className="workflow-map__index" aria-hidden="true">
                {String(index + 2).padStart(2, "0")}
              </span>
              <div className="workflow-map__node-copy">
                <p className="workflow-map__title">{node.title}</p>
                <p>{node.detail}</p>
              </div>
              <span className="workflow-map__node-mark" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
