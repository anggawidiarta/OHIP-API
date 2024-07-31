<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
import { ref } from "vue";
import { reactive } from "vue";
import { onMounted } from "vue";

const state = reactive({
  data: null,
  error: null,
  loading: true,
});

const fetchData = async () => {
  const url =
    "/api/par/v1/hotels/SUMBA/availability?roomStayStartDate=2024-07-31&roomStayEndDate=2024-08-01&roomStayQuantity=2&adults=1&children=0&limit=5";
  const token =
    "eyJ4NXQjUzI1NiI6IlpTN284b1B1WU1lTFVtQl9yTWFxY3NmMGJqZlcxZTVOZUNIWEE3Z2pkQW8iLCJ4NXQiOiItdTNCTUJ6U0hXMDJZTTZjNW94a0YwN2Nyb2siLCJraWQiOiJTSUdOSU5HX0tFWSIsImFsZyI6IlJTMjU2In0.eyJjbGllbnRfb2NpZCI6Im9jaWQxLmRvbWFpbmFwcC5vYzEucGh4LmFtYWFhYWFhcXJwN2wyeWFxYWp4YmRhd2Y3dnhlcmdzY2dob3d0eHY3MmY2empjYzdnemhnZmdpdnlpYSIsInVzZXJfdHoiOiJBbWVyaWNhXC9OZXdfWW9yayIsInN1YiI6IktFVFVULldJUkFXQU4xIiwidXNlcl9sb2NhbGUiOiJlbiIsInNpZGxlIjoxNSwidXNlci50ZW5hbnQubmFtZSI6ImlkY3MtYjNjNmRhMzliNGYyNDRkNTkwZDJmNWFhMWVjMDkyNzQiLCJPQ19Vc2VyUm9sZXMiOlsiTklISS1XU0FDQ0VTUyIsIk5JSEktQURNSU4iLCJTVU1CQS1XU0FDQ0VTUyIsIlNVTUJBLURFVkVMT1BFUlBPUlRBTEFDQ0VTUyIsIk5JSEktREVWRUxPUEVSUE9SVEFMQUNDRVNTIiwiU1VNQkEtQURNSU4iLCJTVU1CQS1DT05GSUdVUkFUSU9OIl0sImlzcyI6Imh0dHBzOlwvXC9pZGVudGl0eS5vcmFjbGVjbG91ZC5jb21cLyIsImRvbWFpbl9ob21lIjoidXMtcGhvZW5peC0xIiwiY2Ffb2NpZCI6Im9jaWQxLnRlbmFuY3kub2MxLi5hYWFhYWFhYTZ1Nm5sbGtsczJsdDdiaHQ2cnRrbjZ3cjd5YTdxYWlnYWN0YzdkNXBtdWJwcWRpeHNrYnEiLCJ1c2VyX3RlbmFudG5hbWUiOiJpZGNzLWIzYzZkYTM5YjRmMjQ0ZDU5MGQyZjVhYTFlYzA5Mjc0IiwiY2xpZW50X2lkIjoib3BlcmEtbXRjYTF1YSIsImRvbWFpbl9pZCI6Im9jaWQxLmRvbWFpbi5vYzEuLmFhYWFhYWFhNzZha3JsbXY3MzVxcHhmdHdwYTNxb2s2bHc3M2NtbGVwM3h0MjMyN3liczNland6aDVjYSIsInN1Yl90eXBlIjoidXNlciIsInNjb3BlIjoidXJuOm9wYzppZG06dC5zZWN1cml0eS5jbGllbnQiLCJPQ19Vc2VyT3duZXJDb2RlIjoiIiwiY2xpZW50X3RlbmFudG5hbWUiOiJpZGNzLWIzYzZkYTM5YjRmMjQ0ZDU5MGQyZjVhYTFlYzA5Mjc0IiwicmVnaW9uX25hbWUiOiJ1cy1waG9lbml4LWlkY3MtMyIsInVzZXJfbGFuZyI6ImVuIiwidXNlckFwcFJvbGVzIjpbIkF1dGhlbnRpY2F0ZWQiXSwiZXhwIjoxNzIyNDMyNTkxLCJpYXQiOjE3MjI0Mjg5OTEsImNsaWVudF9ndWlkIjoiMWI0NDVkYzAwYmI4NDIxMzgyNWVkMTRhYmZkZTdlYzUiLCJjbGllbnRfbmFtZSI6Im9wZXJhLW10Y2ExdWEiLCJPQ19Vc2VyRmlyc3ROYW1lIjoiS2V0dXQiLCJ0ZW5hbnQiOiJpZGNzLWIzYzZkYTM5YjRmMjQ0ZDU5MGQyZjVhYTFlYzA5Mjc0IiwianRpIjoiNjg1NTk0OWNmNDViNDc2ZThjMjg3YTczNDVkYjY1MDIiLCJndHAiOiJqd3QiLCJ1c2VyX2Rpc3BsYXluYW1lIjoiS2V0dXQgV2lyYXdhbiIsIm9wYyI6ZmFsc2UsInN1Yl9tYXBwaW5nYXR0ciI6InVzZXJOYW1lIiwicHJpbVRlbmFudCI6ZmFsc2UsInRva190eXBlIjoiQVQiLCJPQ19Vc2VyRW1wbG95ZWVObyI6IiIsImNhX2d1aWQiOiJjYWNjdC1mN2M5ZjdiZGI0NTc0MWI0OWU3MjdjZWEyMDUzOTUwOCIsImF1ZCI6WyJodHRwczpcL1wvaWRjcy1iM2M2ZGEzOWI0ZjI0NGQ1OTBkMmY1YWExZWMwOTI3NC5pZGVudGl0eS5vcmFjbGVjbG91ZC5jb20iLCJodHRwczpcL1wvaWRjcy1iM2M2ZGEzOWI0ZjI0NGQ1OTBkMmY1YWExZWMwOTI3NC51cy1waG9lbml4LWlkY3MtMy5zZWN1cmUuaWRlbnRpdHkub3JhY2xlY2xvdWQuY29tIiwidXJuOm9wYzpsYmFhczpsb2dpY2FsZ3VpZD1pZGNzLWIzYzZkYTM5YjRmMjQ0ZDU5MGQyZjVhYTFlYzA5Mjc0Il0sImNhX25hbWUiOiJvcmFjbGVnYnVwcm9kIiwiT0NfVXNlckxhc3ROYW1lIjoiV2lyYXdhbiIsInVzZXJfaWQiOiI3NmEyMmFmMWViYjc0MWEzYWI0NjNiNTcwMzU2YWI1NyIsImRvbWFpbiI6ImhnYnVhc3B1YXQiLCJjbGllbnRBcHBSb2xlcyI6WyJVc2VyIEFkbWluaXN0cmF0b3IiLCJHbG9iYWwgVmlld2VyIiwiQXV0aGVudGljYXRlZCBDbGllbnQiLCJDbG91ZCBHYXRlIl0sInRlbmFudF9pc3MiOiJodHRwczpcL1wvaWRjcy1iM2M2ZGEzOWI0ZjI0NGQ1OTBkMmY1YWExZWMwOTI3NC5pZGVudGl0eS5vcmFjbGVjbG91ZC5jb206NDQzIiwiT0NfVXNlck9yZ2FuaXphdGlvbiI6Ik5JSEkifQ.lg6CbL6go4pqHfI2UVLczijoe_Z-6CTaNrrd8fztmXIVoYAmMQaG0eKdL-us40K2RJhZOYNEiDWuMgGL33hib6eJcQWEO4iE-PV8jxz8Q_zYm1rn3ihi6HMLMtsvMtATQxF3hrr097-aIc8_OKAsyKkeosBNkbMGYbUVq9PnaLJylPmKtRXuFU1Vhzq0GK-ZiMhfz4GjTgcEEHh7ypHdRFapsU7cJFkDRUOiwDkur16YLbmj87m1cwQBb9cgl7m474cPmhVOe8dB5hpeNBif1Y2ozywLKt81GtvZfzcduLbhthnsQoBm5TGKd-aivff4BtMO4gYPvYX6pgXfdahFFQ";

  try {
    const response = await axios.get(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      
    });

    state.data = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    state.loading = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <!-- <h1 style="font-size: 48px">{{state.data}}</h1> -->
    <pre>{{ state.data }}</pre>
  </div>

  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div
  </header> -->

  <!-- <RouterView /> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
