import { ProjectModel, UserModel, WorkspaceModel } from '@/models'
import { isValidArray } from '@hpnp/utils/helper'
import { makeAutoObservable } from 'mobx'
import { mobxStorage } from './storage'

export class WorkspaceStore {
  list: WorkspaceModel[] = []

  // workspace member maps
  memberMaps: IMapType<UserModel[]> = {}

  // Current workspace
  currentWorkspaceId = ''

  // Current project
  currentProjectId = ''

  constructor() {
    makeAutoObservable(this)
    mobxStorage(this, 'WS')
  }

  // Current workspace
  get workspace() {
    const workspace = this.list.find(w => w.id === this.currentWorkspaceId!)
    return workspace || this.list![0]
  }

  // Members of current workspace
  get members() {
    const members = this.memberMaps[this.currentWorkspaceId!]
    return isValidArray(members) ? members : []
  }

  // Project of current workspace
  get project() {
    return this.workspace.projects.find(p => p.id === this.currentProjectId)
  }

  setWorkspaces(list: WorkspaceModel[]) {
    this.list = isValidArray(list) ? list : []
  }

  selectWorkspace(workspaceId: string) {
    this.currentWorkspaceId = workspaceId
  }

  addWorkspace(workspace: WorkspaceModel) {
    this.list.push(workspace)
  }

  updateWorkspace(workspaceId: string, updates: Partial<WorkspaceModel>) {
    const workspace = this.list.find(w => w.id === workspaceId)

    if (workspace) {
      Object.assign(workspace, updates)
    }
  }

  deleteWorkspace(workspaceId: string) {
    this.list = this.list.filter(w => w.id !== workspaceId)
  }

  selectProject(projectId: string) {
    this.currentProjectId = projectId
  }

  addProject(workspaceId: string, project: ProjectModel) {
    const workspace = this.list.find(w => w.id === workspaceId)

    if (workspace) {
      workspace.projects.push(project)
    }
  }

  updateProject(workspaceId: string, projectId: string, updates: Partial<WorkspaceModel>) {
    const workspace = this.list.find(w => w.id === workspaceId)

    if (workspace) {
      const project = workspace.projects.find(p => p.id === projectId)

      if (project) {
        Object.assign(project, updates)
      }
    }
  }

  deleteProject(workspaceId: string, projectId: string) {
    const workspace = this.list.find(w => w.id === workspaceId)

    if (workspace) {
      workspace.projects = workspace.projects.filter(p => p.id !== projectId)
    }
  }

  setMembers(id: string, members: UserModel[]) {
    this.memberMaps[id] = members
  }

  deleteMembers(id: string, memberId: string) {
    const members = this.memberMaps[id]

    if (isValidArray(members)) {
      this.memberMaps[id] = members.filter(m => m.id !== memberId)
    }
  }
}
