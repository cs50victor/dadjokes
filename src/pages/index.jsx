import React, { useEffect, useState, useRef, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Flickity from "react-flickity-component";

import { Canvas } from "react-three-fiber";
import { useGLTF, OrbitControls, useProgress, Html} from "@react-three/drei";

import Layout from "../components/Layout";
import haha from "../assets/haha.png";
import "flickity/dist/flickity.min.css";

gsap.registerPlugin(ScrollTrigger)


const Loading=()=>{
  const { progress, errors} = useProgress()
  return (
    <Html center>
        {errors ? 
        (
          <h6 className="
            text-3xl
            font-bold
            afterSuspense
          ">
          {progress} % loaded
          </h6>
        )
        : 
        (
          <h6 className="
            text-3xl
            font-bold
          ">
          Error Loading 3D Model
          </h6>
        )
        }
    </Html>
  );
}


const Model = ({ url, base }) => {
  const group = useRef()

  const { nodes, materials } = useGLTF(url, "/draco-gltf/")
  //console.log(nodes)
  //console.log(materials)

  return (
    <group ref={group} dispose={null} castShadow receiveShadow>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.85, 0]} scale={[0.6, 0.6, 0.6]}>
        <group rotation={[Math.PI / 2.1, 0, 0]}>
          <mesh
            geometry={nodes["polySurface37_blinn1_0"].geometry}
            material-color={base}
          />
          <mesh
            geometry={nodes["polySurface37_lambert2_0"].geometry}
            material={materials.lambert2}
          />
        </group>
      </group>
    </group>
  )
}

const JokeCards = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [dadJokes, setDadJokes] = useState([])

  const getJokes = () => {
    const pageNo = Math.floor(Math.random() * 32) + 1
    const pageUrl = "https://icanhazdadjoke.com/search?page=" + pageNo

    fetch(pageUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        setDadJokes(data.results)
        setLoading(false)
      })
      .catch(err => {
        setError(true)
        console.log(err)
      })
  }

  useEffect(() => {
    //fetching data from the api
    getJokes()
  }, [])

  return (
    <>
      <div
        className="
        relative
        max-w-screen-lg 
        w-full
        my-5 
        bg-transparent
        p-3
        mx-auto
      "
      >
        <Flickity options={{ pageDots: false }}>
          {loading ? (
            <div
              className="
                bg-white 
                shadow-2xl
                text-center 
                w-60
                sm:w-80
                p-3
                mr-5
                sm:mr-7
                h-96
                rounded"
            >
              <p className="text-lg font-semibold">Preparing Dad Jokes....</p>
              <div className="text-center my-5">
                <svg
                  className="animate-spin h-10 w-10 ..."
                  viewBox="0 0 24 24"
                ></svg>
              </div>
            </div>
          ) : (
            ""
          )}

          {!error &&
            !loading &&
            dadJokes.map(({ id, joke }) => (
              <div
                className="
                bg-black
                text-white
                shadow-2xl
                text-center 
                w-60
                sm:w-80
                p-3
                mr-5
                sm:mr-7
                h-96
                rounded-3xl
                flex 
                content-center 
                justify-center
                bg-repeat-y 
                bg-left-top
                border
                border-black
                border-opacity-30
                "
                style={{ backgroundImage: `url(${haha})` }}
                key={id}
              >
                <div className="
                  flex 
                  content-center 
                  justify-center 
                  flex-wrap 
                  my-auto
                  "
                  >
                  <p className="text-lg font-semibold ">{joke}</p>
                </div>
              </div>
            ))}
        </Flickity>
      </div>
      <button
        onClick={getJokes}
        className="
          bg-red-800 
          hover:bg-red-700
          w-50
          p-3
          text-white
          text-base
          font-bold
          mx-auto
          rounded-md
          mt-8
          mb-40
          focus:ring-2
          "
      >
        New Dad Jokes
      </button>
    </>
  )
}

const Home = () => {
  return (
    <Layout>
      <div
        className="
        absolute
        w-screen
        top-20 
        ">
        <h1
          className="
          text-red-800
          left-2/4
          z-4
          text-center
          font-extrabold
          text-8xl
          md:text-9xl"
        >
          DAD
          <br />
          <span>JOKES</span>
        </h1>
      </div>
      <Canvas
        className="z-5"
        style={{minHeight: "600px"}}
        camera={{
          // near: 1,
          // far: 10,
          position: [3, 3.9, 4],
        }}
        shadowMap>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
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
        <Suspense fallback={<Loading/>}>
          <Model 
            url="/scene.gltf" 
            base="#342826" 
          />
        </Suspense>
      </Canvas>
      <JokeCards />
    </Layout>
  )
}
export default Home

// <HtmlContent/>
// Canvas: object is used to draw graphics on your screen
// scene: holds 3d objects on the screen
// camera: A viewer that allows you to look at all surroundings and objects in the scene
// 3d objects: things like camera, mesh, lights models etc
// -> scene(mesh(geometry, material)) + lights
//
