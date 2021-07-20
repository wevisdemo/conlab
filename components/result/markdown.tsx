import { CSSProperties, FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';

type Markdown = {
  children: string;
  components?: Partial<NormalComponents & SpecialComponents>;
};

const Markdown: FunctionComponent<Markdown> = ({
  children,
  components = {},
}) => (
  <ReactMarkdown
    skipHtml
    className="space-y-4"
    components={{
      ...markdownComponents,
      ...components,
    }}
  >
    {
      children.replaceAll?.(
        '        ',
        '  '
      ) /* Stackedit indent with 8 spaces */
    }
  </ReactMarkdown>
);

export default Markdown;

const getIndentedListStyle = (depth: number): CSSProperties => ({
  marginLeft: depth > 0 ? depth * 20 : 25,
});

const markdownComponents: Partial<NormalComponents & SpecialComponents> = {
  ul: ({ children, depth }) => (
    <ul style={getIndentedListStyle(depth)}>{children}</ul>
  ),
  ol: ({ children, depth }) => (
    <ol style={getIndentedListStyle(depth)}>{children}</ol>
  ),
  li: ({ children, ordered }) => (
    <li className={`my-1 ${ordered ? 'list-decimal' : 'list-disc'}`}>
      {children}
    </li>
  ),
  h1: ({ children }) => <h3 className="text-[31px] font-black">{children}</h3>,
  h2: ({ children }) => <h4 className="text-[25px] font-black">{children}</h4>,
  h3: ({ children }) => <h5 className="text-[20px] font-black">{children}</h5>,
  a: ({ children, href }) => (
    <a
      href={href as string}
      target="_blank"
      rel="noreferrer noopener"
      className="text-[#2F80ED] underline"
    >
      {children}
    </a>
  ),
};
