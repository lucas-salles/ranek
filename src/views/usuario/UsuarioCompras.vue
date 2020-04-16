<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div class="produtos-wrapper" v-for="compra in compras" :key="compra.id">
        <ProdutoItem v-if="compra.product" :produto="compra.product">
          <p class="vendedor">
            <span>Vendedor:</span>
            {{compra.vendedor.email}}
          </p>
        </ProdutoItem>
      </div>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "UsuarioCompras",
  components: {
    ProdutoItem
  },
  data() {
    return {
      compras: null
    };
  },
  computed: {
    ...mapState(["usuario", "login"])
  },
  methods: {
    getCompras() {
      api.get(`/transactions?tipo=comprador`).then(response => {
        this.compras = response.data.data.data;
      });
    }
  },
  watch: {
    login() {
      this.getCompras();
    }
  },
  created() {
    if (this.login) this.getCompras();

    document.title = "Usuário | Compras";
  }
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
