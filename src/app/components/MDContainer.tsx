import {
  Alert,
  Box,
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useTheme } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

interface Props {
  path: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Markdown component renderers
function MarkdownLink(props: any) {
  const { href, children } = props;
  return (
    <Link href={href} target="_blank" underline="hover" color="primary">
      {children}
    </Link>
  );
}

function MarkdownTable(props: { children: ReactNode }) {
  return (
    <TableContainer component={Paper} sx={{ my: 3, overflow: 'auto', maxWidth: '100%' }}>
      <Table size="small" aria-label="markdown table">
        {props.children}
      </Table>
    </TableContainer>
  );
}

function MarkdownTableCell(props: any): ReactElement {
  if (props.style?.textAlign === "right") {
    return <StyledTableCell align="right">{props.children}</StyledTableCell>;
  } 
  return <StyledTableCell>{props.children}</StyledTableCell>;
}

function MarkdownTableRow(props: { children: ReactNode }) {
  return <StyledTableRow>{props.children}</StyledTableRow>;
}

function MarkdownCode(props: any): ReactElement {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  
  if (props.inline) {
    return (
      <Chip 
        size="small" 
        label={props.children?.toString()} 
        sx={{ 
          fontFamily: '"Fira Code", monospace',
          fontSize: '0.85rem',
          px: 0.5,
          height: 'auto',
          borderRadius: 1,
          my: 0.5,
        }}
      />
    );
  } 
  
  if (props.className) {
    const language = props.className.split("-")[1];
    return (
      <Box sx={{ my: 2, borderRadius: 1, overflow: 'hidden' }}>
        <SyntaxHighlighter
          language={language}
          style={isDarkMode ? materialDark : materialLight}
          PreTag="div"
          showLineNumbers={true}
          customStyle={{ 
            borderRadius: '4px', 
            fontSize: '0.9rem',
            margin: '0.5rem 0',
          }}
        >
          {props.children.toString().trim()}
        </SyntaxHighlighter>
      </Box>
    );
  }
  
  return (
    <Box sx={{ my: 2, borderRadius: 1, overflow: 'hidden' }}>
      <SyntaxHighlighter
        style={isDarkMode ? materialDark : materialLight}
        PreTag="div"
        customStyle={{ 
          borderRadius: '4px', 
          fontSize: '0.9rem',
          margin: '0.5rem 0',
        }}
      >
        {props.children.toString().trim()}
      </SyntaxHighlighter>
    </Box>
  );
}

function MarkdownDivider() {
  const theme = useTheme();
  return (
    <Divider 
      sx={{ 
        my: 2,
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
      }}
    />
  );
}

function MarkdownH1(props: { children: ReactNode }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 600,
          lineHeight: 1.25,
          mb: 1,
        }}
      >
        {props.children}
      </Typography>
      <MarkdownDivider />
    </Box>
  );
}

function MarkdownH2(props: { children: ReactNode }) {
  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 500,
          lineHeight: 1.25,
          mb: 1,
        }}
      >
        {props.children}
      </Typography>
      <MarkdownDivider />
    </Box>
  );
}

function MarkdownH3(props: { children: ReactNode }) {
  return (
    <Typography
      variant="h6"
      component="h3"
      sx={{
        fontWeight: 500,
        mt: 2.5,
        mb: 1.5,
      }}
    >
      {props.children}
    </Typography>
  );
}

function MarkdownH4(props: { children: ReactNode }) {
  return (
    <Typography
      variant="subtitle1"
      component="h4"
      sx={{
        fontWeight: 500,
        mt: 2,
        mb: 1,
      }}
    >
      {props.children}
    </Typography>
  );
}

function MarkdownH5(props: { children: ReactNode }) {
  return (
    <Typography
      variant="subtitle2"
      component="h5"
      sx={{
        fontWeight: 500,
        mt: 1.5,
        mb: 0.75,
      }}
    >
      {props.children}
    </Typography>
  );
}

function MarkdownH6(props: { children: ReactNode }) {
  return (
    <Typography
      variant="body2"
      component="h6"
      sx={{
        fontWeight: 600,
        mt: 1,
        mb: 0.5,
      }}
    >
      {props.children}
    </Typography>
  );
}

function MarkdownBlockquote(props: any): ReactElement {
  const theme = useTheme();
  return (
    <Box 
      sx={{ 
        borderLeft: 4,
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        pl: 2,
        py: 0.5,
        my: 2,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
        borderRadius: '0 4px 4px 0',
      }}
    >
      {props.children}
    </Box>
  );
}

function MarkdownParagraph(props: any): ReactElement {
  const keyToCheck = "$$typeof";
  const exists = props.children.some(
    (obj: { hasOwnProperty: (arg0: string) => any }) =>
      obj.hasOwnProperty(keyToCheck)
  );

  const isWarning =
    typeof props.children[0] === "string" &&
    props.children[0].includes(":::") &&
    props.children.slice(-1)[0].includes(":::");

  if (isWarning) {
    const severity = props.children[0].split(" ")[1];
    return (
      <Box sx={{ my: 2 }}>
        <Alert severity={severity}>{props.children.slice(2, -1)}</Alert>
      </Box>
    );
  }
  
  if (exists) {
    return (
      <Box sx={{ my: 1.5 }}>
        {props.children}
      </Box>
    );
  }
  
  return (
    <Typography variant="body1" component="p" sx={{ mb: 2 }}>
      {props.children}
    </Typography>
  );
}

function MarkdownImage(props: any) {
  const { src, alt, title } = props;
  
  // Special handling for images
  return (
    <Box 
      sx={{ 
        my: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <img 
        src={src} 
        alt={alt || ''} 
        title={title || ''} 
        style={{
          maxWidth: '100%',
          maxHeight: '500px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      />
      {title && (
        <Typography 
          variant="caption" 
          sx={{ mt: 1, fontStyle: 'italic', textAlign: 'center' }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );
}

export default function MDContainer({ path }: Props) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const theme = useTheme();
  
  useEffect(() => {
    setLoading(true);
    setError(false);
    
    fetch(path)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load ${path}`);
        }
        return res.text();
      })
      .then((text) => {
        // Basic validation to ensure we're getting markdown content
        if (text.includes('<link rel="stylesheet"') || text.includes('<title>')) {
          console.error("Received HTML instead of markdown content");
          setError(true);
          setContent("# Error Loading Content\n\nThere was a problem loading the markdown content. Please try again later.");
        } else {
          setContent(text);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading markdown:", err);
        setError(true);
        setContent("# Error Loading Content\n\nThere was a problem loading the markdown content. Please try again later.");
        setLoading(false);
      });
  }, [path]);

  useEffect(() => {
    if (pathname) {
      let title = pathname.substring(1, pathname.length);
      title = title[0].toUpperCase() + title.substring(1);
      document.title = `${process.env.REACT_APP_NAME || 'Portfolio'} | ${title}`;
    }
  }, [pathname]);

  // Define custom components for markdown rendering
  const components = {
    a: MarkdownLink,
    table: MarkdownTable,
    tr: MarkdownTableRow,
    td: MarkdownTableCell,
    th: MarkdownTableCell,
    code: MarkdownCode,
    h1: MarkdownH1,
    h2: MarkdownH2,
    h3: MarkdownH3,
    h4: MarkdownH4,
    h5: MarkdownH5,
    h6: MarkdownH6,
    p: MarkdownParagraph,
    blockquote: MarkdownBlockquote,
    hr: MarkdownDivider,
    img: MarkdownImage,
  };

  return (
    <Container maxWidth="md" className="page-transition md-content">
      {loading ? (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '50vh'
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Paper 
          sx={{ 
            p: 3, 
            mt: 3,
            borderRadius: 2,
            bgcolor: theme => theme.palette.mode === 'dark' 
              ? 'rgba(255, 0, 0, 0.05)'
              : 'rgba(255, 0, 0, 0.02)',
            border: '1px solid',
            borderColor: theme => theme.palette.mode === 'dark'
              ? 'rgba(255, 0, 0, 0.1)'
              : 'rgba(255, 0, 0, 0.05)',
          }}
        >
          <Alert severity="error" sx={{ mb: 2 }}>
            There was a problem loading the content. Please try refreshing the page.
          </Alert>
          
          <Typography variant="body1">
            If the issue persists, please check the following:
          </Typography>
          
          <ul>
            <li>The markdown file exists at the correct path</li>
            <li>The server is properly serving static files</li>
            <li>The file content is valid markdown</li>
          </ul>
        </Paper>
      ) : (
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            mt: 3,
            mb: 4,
            borderRadius: 2,
            boxShadow: theme => theme.palette.mode === 'dark'
              ? '0 4px 20px rgba(0, 0, 0, 0.25)'
              : '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <ReactMarkdown
            children={content}
            components={{
              code: MarkdownCode,
              a: MarkdownLink,
              p: MarkdownParagraph,
              table: MarkdownTable,
              thead: TableHead,
              tbody: TableBody,
              th: MarkdownTableCell,
              tr: MarkdownTableRow,
              td: MarkdownTableCell,
              tfoot: TableFooter,
              h1: MarkdownH1,
              h2: MarkdownH2,
              h3: MarkdownH3,
              h4: MarkdownH4,
              h5: MarkdownH5,
              h6: MarkdownH6,
              hr: MarkdownDivider,
              blockquote: MarkdownBlockquote,
              img: MarkdownImage,
            }}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeRaw]}
          />
        </Paper>
      )}
    </Container>
  );
}
