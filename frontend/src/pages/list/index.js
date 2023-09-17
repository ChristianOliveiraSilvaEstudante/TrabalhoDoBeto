import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import MainLayout from "../../layouts/main";
import axios from 'axios';

import './style.css'

function Page() {
    const [products, setProducts] = useState([])

    useEffect(() => {
      // Faz uma solicitação Axios para a sua rota
      axios.get('http://localhost:3001/products')
        .then((response) => {
          const data = response.data;
  
          setProducts(data);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados da rota:', error);
        });
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        // Verifica se o usuário chegou ao final da página
        if (
          window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
        ) {
          // setProducts((prevProducts) => prevProducts.concat(Array(10).fill(demo)))
        }
      };
  
      // Adiciona um event listener para o evento de rolagem da janela
      window.addEventListener('scroll', handleScroll);
  
      // Remove o event listener quando o componente for desmontado
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [])

    return (
      <MainLayout>
        <header>
          <h1>Listão do Betão</h1>
        </header>

        <main>
          <h3>Total: {products.length}</h3>

          <div className="list-grid">
            {
              products.map((e) => <ProductCard key={e.id} product={e} />)
            }
          </div>
        </main>
      </MainLayout>
    );
  }
  
  export default Page;
  