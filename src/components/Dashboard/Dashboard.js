import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Button,
  TextField,
  Chip,
  Tabs,
  Tab,
  Drawer,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  Forum as ForumIcon,
  ContactPhone as DirectoryIcon,
  School as MentorshipIcon,
  Work as JobsIcon,
  Event as EventIcon,
  Business as BusinessDirectoryIcon,
  Description as ResourcesIcon,
  ExitToApp as LogoutIcon,
  Add as AddIcon,
  Bookmark as BookmarkIcon,
  Favorite as FavoriteIcon,
  ChatBubbleOutline as CommentIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
  },
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  }),
);

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Forum', icon: <ForumIcon /> },
    { text: 'Directory', icon: <DirectoryIcon /> },
    { text: 'Mentorship', icon: <MentorshipIcon /> },
    { text: 'Jobs', icon: <JobsIcon /> },
    { text: 'Events', icon: <EventIcon /> },
    { text: 'Business Directory', icon: <BusinessDirectoryIcon /> },
    { text: 'Resources', icon: <ResourcesIcon /> },
    { text: 'Log Out', icon: <LogoutIcon /> },
  ];

  const threads = [
    { id: 1, author: 'Hado Kagutsuchi', title: 'The Future of Freelancers is Promising!', content: 'Freelance work is such a great job. The New Year provides good reasons to be optimistic and to smile, as it projects a positive and stable career future for...', time: '32 min ago', category: 'Freelance', likes: 56, comments: 16 },
    { id: 2, author: 'Mulan Fang', title: 'Why Do I Get Bored with Jobs Easily?', content: 'Psychologists say monotony is one the most common causes of boredom. Often times our natural response to monotony is to seek external stimulation—we...', time: '48 min ago', category: 'Career', likes: 48, comments: 32 },
    { id: 3, author: 'Ameer Black Mamba', title: 'Burnout Prevention and Treatment', content: 'If constant stress has you feeling helpless, disillusioned, and completely exhausted, you may be on the road to burnout. Learn what you can do to regain your...', time: '1 hour ago', category: 'Tips', likes: 0, comments: 0 },
  ];

  const recommendedTopics = ['Freelance', 'Productivity', 'Business', 'Psychology', 'Tips', 'Mindfulness'];
  
  const events = [
    { id: 1, title: 'Annual Alumni Dinner', date: '2023-09-15' },
    { id: 2, title: 'Career Fair', date: '2023-10-01' },
  ];

  const initiatives = [
    { id: 1, title: 'Scholarship Fund', description: 'Help support future students' },
    { id: 2, title: 'Mentorship Program', description: 'Guide current students in their career paths' },
  ];

  const suggestedAlumni = [
    { id: 1, name: 'Alice Johnson', graduationYear: 2018 },
    { id: 2, name: 'Bob Williams', graduationYear: 2019 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white', color: 'black' }}>
          <Toolbar>
            {isSmallScreen && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              NUS
            </Typography>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <Avatar sx={{ ml: 2 }}>JM</Avatar>
          </Toolbar>
        </AppBar>
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          open={isSmallScreen ? drawerOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
            },
          }}
        >
          <Toolbar />
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text}>
                <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={!isSmallScreen || drawerOpen}>
          <Toolbar />
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Start a discussion or questions related to alumni, career, business, or freelancing"
                  sx={{ mb: 2, backgroundColor: 'white' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    Start your idea now
                  </Button>
                </Box>
                <Paper sx={{ p: 2 }}>
                  <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }} variant="scrollable" scrollButtons="auto">
                    <Tab label="Recent Thread" />
                    <Tab label="Popular This Week" />
                    <Tab label="Saved" />
                  </Tabs>
                  {threads.map((thread) => (
                    <Card key={thread.id} sx={{ mb: 2 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                          <Avatar sx={{ mr: 1 }}>{thread.author[0]}</Avatar>
                          <Typography variant="subtitle1">{thread.author}</Typography>
                          <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                            {thread.time} • in {thread.category}
                          </Typography>
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {thread.title}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {thread.content}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton size="small">
                          <BookmarkIcon />
                        </IconButton>
                        <IconButton size="small">
                          <FavoriteIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                          {thread.likes}
                        </Typography>
                        <IconButton size="small">
                          <CommentIcon />
                        </IconButton>
                        <Typography variant="body2">
                          {thread.comments}
                        </Typography>
                      </CardActions>
                    </Card>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Recommended Topics
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {recommendedTopics.map((topic) => (
                      <Chip key={topic} label={topic} sx={{ m: 0.5 }} />
                    ))}
                  </Box>
                </Paper>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Upcoming Events
                  </Typography>
                  <List>
                    {events.map((event) => (
                      <ListItem key={event.id}>
                        <ListItemText primary={event.title} secondary={event.date} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Current Initiatives
                  </Typography>
                  <List>
                    {initiatives.map((initiative) => (
                      <ListItem key={initiative.id}>
                        <ListItemText primary={initiative.title} secondary={initiative.description} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    People You May Know
                  </Typography>
                  <List>
                    {suggestedAlumni.map((alumni) => (
                      <ListItem key={alumni.id}>
                        <ListItemAvatar>
                          <Avatar>{alumni.name[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={alumni.name} secondary={`Class of ${alumni.graduationYear}`} />
                        <Button variant="outlined" size="small">
                          Connect
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Main>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;