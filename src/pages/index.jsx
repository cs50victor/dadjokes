import React, {useEffect, useState, useRef, Suspense} from "react";
import { Helmet } from "react-helmet";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import {Canvas,useFrame,useThree,useLoader} from "react-three-fiber";
import {useGLTF ,Sky,OrbitControls,Html} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {useSpring} from "@react-spring/core";
import { a } from "@react-spring/three";

import Layout from "../components/Layout";
import typical from "../assets/bald-man.svg";
import "../styles/index.scss";


gsap.registerPlugin(ScrollTrigger);

const ModelToUse =()=> {

  const group = useRef();
  //const { nodes } = useGLTF("../assets/table/scene.gltf");
  const { nodes, materials } = useGLTF("https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf","/draco-gltf/");
  console.log(nodes)
  console.log(materials)
  return (
    <group ref={group} dispose={null} castShadow receiveShadow>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes["node_damagedHelmet_-6514"].geometry}
            material={materials["Material_MR"]}
            material-color={"#8B4513"}
          />
        </group>
      </group>
    </group>
  );
};

const Home =()=>{
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dadJokes, setDadJokes] = useState([]);
  const pinStartRef = useRef(null);
  const jokeRefs = useRef([]);
  jokeRefs.current = [];


  useEffect(()=>{
    //fetching data from the api
     const pageNo = Math.floor(Math.random() * 32) + 1; 
     const pageUrl = "https://icanhazdadjoke.com/search?page=" + pageNo

     fetch(pageUrl, {
       method: "GET",
       headers:{
          Accept: "application/json",
       }
     })
     .then(response => response.json())
     .then(data => {
        setDadJokes(data.results)
        setLoading(false)
      })
      .catch(err=>{setError(true);console.log(err);})
  }, []);

  useEffect(() => {
    //! for animation

    //jokeRefs.current.forEach((el, index) => {  

    //  ScrollTrigger.create({
    //      id: `joke-${index+1}`,
    //      trigger: el,
    //      start: "top top",
    //      pin: true,
    //      pinSpacing:false,
    //      anticipatePin: 1
    //  });

    //});
  }, [])

  
  const addToRefs = (el)=> {
    if (el && !jokeRefs.current.includes(el)) {
        jokeRefs.current.push(el);
    }
  };
  
  return(
    <>
      <Helmet>
          <title>Dad Jokes</title>
      </Helmet>
      <Layout >
        <div className="card-header bg-white mt-5">
          Dad Jokes....
        </div>
        <section 
          className="bg-dark my-5 py-5"
          ref={pinStartRef}
        >
          {loading ? 
            (
            <div className="card text-center">
              <div className="card-header m-2">
                Preparing Dad Jokes....
              </div>
              <div className="text-center my-5">
                  <div className="spinner-border" role="status">
                  </div>
                </div>
            </div>
          ):
          ""
          }
          
          {!error && !loading && dadJokes.map(({id, joke})=>(
            <div 
              className="card text-center my-4"
              ref={addToRefs} 
              key={id}
            >
              <div className="card-body">
              <img src={typical}  className="img-fluid" alt="old dad" width="150px"/>
              <h5 className="card-title p-4">
                {joke}
              </h5>
              </div>
            </div>
          ))}
        </section>
        
      </Layout>
      <Canvas 
          style={{height:"100vh" }}
          camera={{
            // near: 1,
            // far: 10,
            position: [0, 0.2, 4],
          }}
          shadowMap
        >
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableDamping
            dampingFactor={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <ambientLight intensity={4} />
          <pointLight intensity={6} position={[-10, -25, -10]} />
          <spotLight
            castShadow
            intensity={8}
            angle={Math.PI / 8}
            position={[25, 25, 15]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Suspense fallback={null}>
            <ModelToUse/>
          </Suspense>
          <Sky 
            azimuth={0.5} 
            turbidity={10} 
            rayleigh={0.5} 
            inclination={0.6}
            distance={100000}
          />
        </Canvas>
    </>
  )
};
export default Home;