<template>
  <aside :class="`${isExpanded && 'isExpanded'}`">
    <div class="logo">
      <img src="../assets/vue.svg">
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link class="button" to="/dashboard">
        <span class="material-icons">home</span>
        <span class="text">Dashboard</span>
      </router-link>
      <router-link class="button" to="/table">
        <span class="material-icons">description</span>
        <span class="text">Table</span>
      </router-link>
      <!-- <router-link class="button" to="/about">
        <span class="material-icons">visibility</span>
        <span class="text">About</span>
      </router-link>
      <router-link class="button" to="/landing">
        <span class="material-icons">group</span>
        <span class="text">Team</span>
      </router-link>
      <router-link class="button" to="/contact">
        <span class="material-icons">email</span>
        <span class="text">Contact Us</span>
      </router-link> -->
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link class="button" to="/logout">
        <span class="material-icons">logout</span>
        <span class="text">Log Out</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isExpanded = ref(localStorage.getItem("isExpanded") === "true")

const ToggleMenu = () =>  {
  isExpanded.value = !isExpanded.value

  localStorage.setItem("isExpanded", isExpanded.value)
}
</script>

<style lang="scss" scoped>

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: var(--dark);
  color: var(--light);

  transition: 0.2s ease-in-out;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }

  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.35rem);
        }
      }
    }
  }

  h3, .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover, &.router-link-exact-active {
        background-color: var(--dark-alt);

        .material-icons, .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid var(--primary);
      }
    }
  }

  &.isExpanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3, .button .text {
        opacity: 1;
    }

    h3 {
      color: var(--grey);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

  }

  @media (max-width: 768) {
    position: fixed;
    z-index: 999;
  }
}

</style>