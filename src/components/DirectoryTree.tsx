import React from "react";
import { SimpleTreeView, TreeItem, treeItemClasses } from "@mui/x-tree-view";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { styled } from "@mui/material/styles";


type TreeNode = {
  id: string;
  name: string;
  children?: TreeNode[];
};

interface DirectoryTreeProps {
  data: TreeNode[];
}

const StyledTreeItem = styled(TreeItem)(() => ({
  [`& .${treeItemClasses.content}.Mui-selected`]: {
    backgroundColor: "transparent !important",
  },
  [`& .${treeItemClasses.content}.Mui-selected:hover`]: {
    backgroundColor: "transparent !important",
  },
}));

const DirectoryTree: React.FC<DirectoryTreeProps> = ({ data }) => {

  const renderTree = (nodes: TreeNode) => (
    <StyledTreeItem key={nodes.id} itemId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((child) => renderTree(child))
        : null}
    </StyledTreeItem>
  );

  return (
    <SimpleTreeView
      aria-label="directory tree"
      slots={{ expandIcon: ChevronRight, collapseIcon: ExpandMore }}
      sx={{ flexGrow: 1, overflowY: "auto",  borderRight: '1px solid lightgray', height:'100vh' }}
    >
      {data.map((tree) => renderTree(tree))}
    </SimpleTreeView>
  );
};

export default DirectoryTree;
