import { DashboardAPI } from "hub-dashboard-addons";

const Api = {
  Projects: "api/rest/projects?fields=id,shortName,name,iconUrl",
  Members: "api/rest/users?fields=id,name",
};

const BaseUrl = process.env.BASE_URL;

interface Project {
  iconUrl: string;
  name: string;
  id: string;
}

interface Member {
  name: string;
  id: string;
}

interface YtData {
  members: Member[];
  projects: Project[];
}

class YtAPI {
  data: YtData = {
    members: [],
    projects: [],
  };
  api: DashboardAPI;

  async init(api: DashboardAPI) {
    this.api = api;

    await api.fetchHub(Api.Members).then(
      (value) => this.data.members = value.users
    );
    await api.fetchHub(Api.Projects).then(
      (value) => this.data.projects = value.projects
    );

    console.log(this.data);
  }

  getMembers() {
    return this.data.members;
  }

  getProjects() {
    return this.data.projects;
  }
}

export const ytAPI = new YtAPI();
