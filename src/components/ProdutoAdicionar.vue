<template>
  <div>
    <form class="adicionar-produto">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" v-model="produto.nome" />
      <label for="preco">Preço (R$)</label>
      <input type="number" name="preco" id="preco" v-model="produto.preco" />
      <label for="fotos">Fotos</label>
      <input type="file" name="fotos" id="fotos" multiple ref="fotos" />
      <label for="descricao">Descrição</label>
      <textarea name="descricao" id="descricao" v-model="produto.descricao"></textarea>
      <input class="btn" type="submit" value="Adicionar Produto" @click.prevent="adicionarProduto" />
    </form>
    <ErroNotificacao :erros="erros" />
  </div>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "ProdutoAdicionar",
  data() {
    return {
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null
      },
      erros: []
    };
  },
  methods: {
    formatarProdutos() {
      const form = new FormData();

      const files = this.$refs.fotos.files;
      for (const file of files) {
        form.append("fotos[]", file);
      }

      form.append("nome", this.produto.nome);
      form.append("preco", this.produto.preco);
      form.append("descricao", this.produto.descricao);

      return form;
    },
    async adicionarProduto() {
      if (this.checkForm()) {
        this.erros = [];

        const produto = this.formatarProdutos();

        const button = event.currentTarget;
        button.value = "Adicionando...";
        button.setAttribute("disabled", "");

        await api.post("/products", produto);
        await this.$store.dispatch("getUsuarioProdutos");

        button.removeAttribute("disabled");
        button.value = "Adicionar Produto";

        this.limparForm();
      }
    },
    checkForm() {
      if (this.produto.nome && this.produto.preco && this.produto.descricao) {
        return true;
      }

      this.erros = [];

      // removendo o campo fotos do array
      let array = Object.entries(this.produto);
      array.splice(3, 1);
      for (const field of array) {
        if (!field[1]) this.erros.push(`O campo ${field[0]} é obrigatório.`);
      }
    },
    limparForm() {
      this.produto.nome = "";
      this.produto.preco = "";
      this.produto.descricao = "";
      this.$refs.fotos.value = "";
    }
  }
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
