/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react';
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
  export default ReactComponent;
}

type TreeNode = { type: 'file' } | { type: 'folder'; children: Record<string, TreeNode> };
type TreeResponse = { root: Record<string, TreeNode> };
type TreeChild = {
  [k: string]: TreeNode;
};
