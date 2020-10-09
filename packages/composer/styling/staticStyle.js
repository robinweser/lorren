export default [
  {
    selector: '*',
    style: {
      margin: 0,
      padding: 0,
    },
  },
  {
    selector: '::-webkit-scrollbar',
    style: {
      display: 'none',
    },
  },
  {
    selector: 'html,body,#__next',
    style: {
      minHeight: '100vh',
    },
  },
  {
    selector: '#__next',
    style: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  {
    selector: 'body',
    style: {
      fontFamily: '-apple-system,sans-serif',
      overscrollBehavior: 'none',
      overflow: 'auto',
      fontSize: 14,
    },
  },
  {
    selector: 'div',
    style: {
      maxWidth: '100%',
    },
  },
]
