import React from "react";
import { SimpleTreeView, TreeItem, treeItemClasses } from "@mui/x-tree-view";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import "./style.scss";

type TreeNode = {
  id: string;
  name: string;
  children?: TreeNode[];
};

interface DirectoryTreeProps {
  data: TreeNode[];
}

const StyledTreeItem = styled(TreeItem)(() => ({
    ['& .MuiTreeItem-label'] : {
        fontSize: '15px',
        fontWeight: 400,
        color: '#333333',
        borderRadius:'0px',
    },
    ['& .MuiTreeItem-content'] : {
        padding:'6px',
    },
    ['& .MuiTreeItem-root'] : {
        padding:'0px',
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
    <div className="template-directory-tree-main-container">
    <SimpleTreeView
      aria-label="directory tree"
      slots={{ expandIcon: ChevronRight, collapseIcon: ExpandMore }}
      sx={{ flexGrow: 1, overflowY: "auto",  borderRight: '1px solid lightgray', height:'100%' }}
    >
      {data.map((tree) => renderTree(tree))}
    </SimpleTreeView>
    </div>
  );
};

export default DirectoryTree;
