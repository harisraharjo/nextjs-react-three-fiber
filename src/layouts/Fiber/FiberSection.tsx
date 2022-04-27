import { useRenderWithContext, type UseRender } from "./hooks/useRender";

export const FiberSection = ({
  children,
}: Pick<UseRender, "children">): null => {
  useRenderWithContext(children);
  return null;
};

export default FiberSection;
