<template>
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
    </UsuarioForm>
    <ErroNotificacao :erros="erros" />
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";

export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm
  },
  data() {
    return {
      erros: []
    };
  },
  methods: {
    atualizarUsuario() {
      api
        .put(
          `/users/${this.$store.state.usuario.id}`,
          this.$store.state.usuario
        )
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "usuario" });
        })
        .catch(error => {
          this.erros.push(error.response.data.message);
        });
    }
  },
  created() {
    document.title = "Usuário | Editar";
  }
};
</script>

<style>
</style>
