import { Input, Tag, Tree } from 'antd';
import React, { useState } from 'react';
import './App.css';
import { treeData } from './data'

const { TreeNode } = Tree

function _renderTreeNode(tree, keyNode) {
  const node = tree[keyNode]

  return (
    <TreeNode key={node.key} title={`${node.title}`} >
      {
        node.children.length > 0 &&
        node.children.map(child => _renderTreeNode(tree, child))
      }
    </TreeNode>
  )
}

function CustomTree() {
  const [nodeSelected, setNodeSelected] = useState(null)
  const [tree, setTree] = useState(treeData)

  const onSelect = (key) => setNodeSelected(key[0])

  const onPressEnter = (event) => {
    if (event.key === 'Enter') {
      const { value } = event.target;
      if (!value.trim()) return;

      const newTree = {...tree}
      newTree[nodeSelected].title = value
      setTree(newTree)
    }
  }

  return (
    <>
      <Tag color="volcano">Please select node to rename !!!</Tag>
      <Tree
        onSelect={onSelect}
      >
        {tree.root.children.map(item => _renderTreeNode(tree, item))}
      </Tree>
      {
        nodeSelected &&
        <div style={{ padding: '20px 30px' }}>
          <Tag color="volcano">Press enter to rename node !!!</Tag>
          <Input placeholder={tree[nodeSelected].title} onKeyDown={onPressEnter} />
        </div>
      }
    </>

  );
}



export default CustomTree;
