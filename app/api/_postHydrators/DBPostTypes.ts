export type BlockType = 'paragraph' | 'header' | 'list' | 'quote' | 'mermaid';
export type BlockStyleType = 'unordered' | 'ordered';
export type BlockStyleAlignment = 'left' | 'center';

export type TypeName =
  | 'HeaderBlockData'
  | 'ListBlockData'
  | 'QuoteBlockData'
  | 'MermaidBlockData';

export interface BlockData {
  text?: string;
}

export interface HeaderBlockData extends BlockData {
  level?: number;
}

export interface ListBlockData extends BlockData {
  style: BlockStyleType;
  items: string[];
}

export interface QuoteBlockData extends BlockData {
  caption: string;
  alignment: BlockStyleAlignment;
}

export interface MermaidBlockData extends BlockData {
  caption: string;
  code: BlockStyleAlignment;
}

export const blockTypeGuard = <T extends BlockData>(
  block: BlockData,
  typeName: TypeName
): block is T => {
  if (
    (block as HeaderBlockData).level !== undefined &&
    typeName === 'HeaderBlockData'
  ) {
    return true;
  }

  if (
    (block as ListBlockData).style !== undefined &&
    Array.isArray((block as ListBlockData).items) &&
    typeName === 'ListBlockData'
  ) {
    return true;
  }

  if (
    typeof (block as QuoteBlockData).caption === 'string' &&
    (block as QuoteBlockData).alignment !== undefined &&
    typeName === 'QuoteBlockData'
  ) {
    return true;
  }

  if (
    typeof (block as MermaidBlockData).caption === 'string' &&
    (block as MermaidBlockData).code !== undefined &&
    typeName === 'MermaidBlockData'
  ) {
    return true;
  }

  return false;
};
