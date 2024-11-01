import NewProject from './Components/NewProject.jsx';
import NoProjectSelected from './Components/NoProjectSelected.jsx';
import ProjectSidebar from './Components/ProjectSidebar.jsx'
import { useState } from 'react';
import SelectedProject from './Components/SelectedProject.jsx';

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId : undefined,
    projects: [],
    tasks: [],
  })

  function handleAddTask(text){
    setProjectState((prevState) =>{
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return{
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }
  
  function handleDeleteTask(id){
    setProjectState(prevState => {
      return{
      ...prevState,
      tasks: prevState.tasks.filter(
        (task)=> task.id !== id),
      };
    }); 
  }

  function handleStartAddProject(){
    setProjectState(prevState => {
      return{
      ...prevState,
      selectedProjectId : null,
      };
    });
  }

  function handleAddProject(projectData){
    setProjectState(prevState =>{
      const projectId= Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelProject(){
    setProjectState(prevState => {
      return{
      ...prevState,
      selectedProjectId : undefined,
      };
    });
  }

  function handleSelectProject(id){
      setProjectState(prevState => {
      return{
      ...prevState,
      selectedProjectId : id,
      };
    });
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return{
      ...prevState,
      selectedProjectId : undefined,
      projects: prevState.projects.filter(
        (project)=> project.id !== prevState.selectedProjectId),
      };
    });    
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)
  let content = <SelectedProject onDeleteTask={handleDeleteTask} onAddTask={handleAddTask} onDelete={handleDeleteProject} project={selectedProject} tasks={projectState.tasks}/>;
  
  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject}/>;
  } else if( projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }

  return (
    <main className='h-screen my-8 flex gap-8 '>
      <ProjectSidebar 
      onStartAddProject={handleStartAddProject}
      projects={projectState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
