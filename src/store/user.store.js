import { defineStore } from "pinia";
import axios from "axios";

const API_URL =
  "https://reports-rest.herokuapp.com/api/reports/62b1571a8198364032ffbf74";

export const useRepotsStore = defineStore("reports", {
  state: () => ({
    reports: [],
    feedBack: "",
  }),
  actions: {
    async getReports() {
      const config = {
        method: "get",
        url: API_URL,
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmIxNTcxYTgxOTgzNjQwMzJmZmJmNzQiLCJpYXQiOjE2NTU5MjI2OTUsImV4cCI6MTY4NzQ1ODY5NX0.oX0qtrHzeSbRmdGFiXqVHWJcaujAJLqoIcbfqtj7ARg",
        }, 
      };
      const { data } = await axios(config);
      console.log(data);
      this.reports = data;
    },
    async addReport(value, user) {
      const { titulo, descripcion } = value;
      const config = {
        method: "post", 
        url: "https://reports-rest.herokuapp.com/api/reports/newReport",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmIxNTcxYTgxOTgzNjQwMzJmZmJmNzQiLCJpYXQiOjE2NTU5MjI2OTUsImV4cCI6MTY4NzQ1ODY5NX0.oX0qtrHzeSbRmdGFiXqVHWJcaujAJLqoIcbfqtj7ARg",
        },
        data: {
          name: titulo,
          message: descripcion,
          user,
        },
      };
      const { data } = await axios(config);

      if (data) {
        this.feedBack = data.msg
      }
    },
    async deleteReport (reason, id) {

    }
  },
});
