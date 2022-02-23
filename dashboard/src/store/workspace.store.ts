import type { ProjectModel, UserModel, WorkspaceModel } from '@/models'
import type { FormModel } from '@heyforms/shared-types-enums'
import { isValidArray } from '@hpnp/utils/helper'
import { makeAutoObservable } from 'mobx'
import { mobxStorage } from './storage'

export class WorkspaceStore {
  list: WorkspaceModel[] = []

  // workspace member maps
  memberMaps: IMapType<UserModel[]> = {}

  // project forms
  formMaps: IMapType<FormModel[]> = {}

  // Current workspace
  currentWorkspaceId = ''

  // Current project
  currentProjectId = ''

  // Current form
  currentFormId = ''

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

  // Forms of current project
  get forms() {
    const forms = this.formMaps[this.currentProjectId]
    return isValidArray(forms) ? forms : []
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
    this.currentWorkspaceId = ''
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

  addProjectMember(workspaceId: string, projectId: string, memberId: string) {
    const workspace = this.list.find(w => w.id === workspaceId)

    if (workspace) {
      const project = workspace.projects.find(p => p.id === projectId)

      if (project) {
        Object.assign(project, {
          members: [...project.members, memberId]
        })
      }
    }
  }

  deleteProjectMember(workspaceId: string, projectId: string, memberId: string) {
    const workspace = this.list.find(w => w.id === workspaceId)

    if (workspace) {
      const project = workspace.projects.find(p => p.id === projectId)

      if (project) {
        Object.assign(project, {
          members: project.members.filter(m => m !== memberId)
        })
      }
    }
  }

  selectForm(formId: string) {
    this.currentFormId = formId
  }

  setForms(projectId: string, forms: FormModel[]) {
    this.formMaps[projectId] = forms
  }

  addForm(projectId: string, form: FormModel) {
    const forms = this.formMaps[projectId]

    if (isValidArray(forms)) {
      forms.push(form)
    }
  }

  updateForm(projectId: string, formId: string, updates: Partial<FormModel>) {
    const forms = this.formMaps[projectId]

    if (isValidArray(forms)) {
      const form = forms.find(f => f.id === formId)

      if (form) {
        Object.assign(form, updates)
      }
    }
  }

  deleteForm(projectId: string, formId: string) {
    let forms = this.formMaps[projectId]

    if (isValidArray(forms)) {
      forms = forms.filter(f => f.id !== formId)
    }
  }

  setMembers(id: string, members: UserModel[]) {
    this.memberMaps[id] = members
  }

  deleteMember(id: string, memberId: string) {
    const members = this.memberMaps[id]

    if (isValidArray(members)) {
      this.memberMaps[id] = members.filter(m => m.id !== memberId)
    }
  }
}
