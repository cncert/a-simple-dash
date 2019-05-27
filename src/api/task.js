import request from "@/utils/request";

export function longTask(data) {
  return request({
    url: "/api/ansible_task",
    method: "post",
    data,
    // baseURL: process.env.VUE_APP_BAKEN_BASE_API
  });
}
