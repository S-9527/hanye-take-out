import { defineStore } from "pinia";
import { reactive } from "vue";
import { type Account, loginAPI, registerAPI } from "@/api/employee";
import type { UserResponse } from "@/api/types";
import { setToken } from "@/utils/token";

interface User {
    id: number;
    account: string;
}

export const useUserStore = defineStore('user', () => {
    const user = reactive<User>({
        id: 0,
        account: "",
    });

    function setupUser(userResponse: UserResponse) {
        user.id = userResponse.id;
        user.account = userResponse.account;
        setToken(userResponse.token);
    }

    async function login(params: Account) {
        const userResponse = await loginAPI(params);
        setupUser(userResponse);
    }

    async function register(params: Account) {
      await registerAPI(params);
    }

    return {
      login,
      register
    }
})