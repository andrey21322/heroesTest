import {useState, useEffect} from 'react'
import Heroes from "./components/heroes";
import AddBtn from "./components/add-btn";
import HeroInModal from "./components/heroInModal";
import Pagination from "./components/pagination";
import Modal from "./components/modal";
import axios from 'axios';

function App() {
  const [heroes, setHeroes] = useState([])
  const [hero, setHero] = useState({})
  const [photo, setPhoto] = useState(null)
  const [heroInModal, setHeroInModal] = useState({})
  const [modal, setModal] = useState(false)
  const [modalBtn, setModalBtn] = useState('ADD')
  const [currentPage, setCurrentPage] = useState(1)
  const [err, setErr] = useState(null)
  const perPage = 5
  
  useEffect(() => {
    axios.get('http://localhost:3001/heroes')
    .then(response => setHeroes(response.data))
    .catch(e => console.log(e))
  }, [])

  const choosedHero = (name) => {
    setHeroInModal(heroes.find(item => item.nickname === name))
  }

  const deleteHero = (name) => {
    let newHeroes = [...heroes]
    newHeroes.map((item, i) => {
      if(item.nickname === name){
        newHeroes.splice(i, 1)
      }})
    setHeroes(newHeroes)
    axios.post('http://localhost:3001/hero', newHeroes)
  }

  const deleteImg = (image) => {
    let newImgArr = hero.img
    let newHeroes = [...heroes]

    newImgArr.map((item, i) => {
      if(item === image){
        newImgArr.splice(i, 1)
      }})
    
    newHeroes.map(item => {
      if(item.nickname === hero.nickname){
        item.img = newImgArr
      }})
    setHero({...hero, img:newImgArr})
    axios.post('http://localhost:3001/hero', newHeroes)
  }

  const editHero = (name) => {
    openCloseModal()
    setModalBtn('EDIT')
    setHero(heroes.find(item => item.nickname === name))
  }
  
  const sendPhoto = () => {
    const formData = new FormData();
    formData.append('photo', photo);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const url = 'http://localhost:3001/upload'
    axios.post(url, formData, config).then((res) => {
      console.log(res)
    }).catch((e)=>{console.log(e)})

  }

  const onAdd = () => {
    let checkHero = heroes.find(item => item.nickname === hero.nickname)
    if(checkHero) {
      setErr('Hero with that name already exists')
      setTimeout(() => {
        setErr(null)
      }, 3000);
    } else if(hero.nickname === '' || hero.nickname === ' ') {
      setErr('Hero nickname cant be empty')
      setTimeout(() => {
        setErr(null)
      }, 3000);
    } else {
      let newHeroes = [...heroes]
      newHeroes.push(hero)
      sendPhoto()
      setHeroes([... heroes, hero])
      axios.post('http://localhost:3001/hero', newHeroes)
      openCloseModal()
    }
  }

  const onEdit = () => {
    const newHeroes = [...heroes]
    newHeroes.map(item => {
      if(item.nickname === hero.nickname){
        item.nickname = hero.nickname
        item.real_name = hero.real_name
        item.origin_description = hero.origin_description
        item.superpowers = hero.superpowers
        item.catch_phrase = hero.catch_phrase
        item.img = hero.img
      }
    })
    if(photo !== null) {
      sendPhoto()
    }
    axios.post('http://localhost:3001/hero', newHeroes)
    openCloseModal()
  }

  const openCloseModal = () => {
    setModalBtn('ADD')
    setModal(prev => !prev)
    setHero({nickname:'', real_name:'', origin_description:'', superpowers:'', catch_phrase:'', img:[]})
  }

  const onImageChange = (event) => {
    let image = event.target.files[0]
    let imgArr = [...hero.img]
    imgArr.push(image.name)
    setHero({...hero, img:imgArr})
    setPhoto(image)
  }

  const handleChange = (e) => {
    setHero({ ...hero, [e.target.name]: e.target.value })
  }

  const paginate = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }

  const lastPostsIdx = currentPage * perPage
  const firstPostsIdx = lastPostsIdx - perPage
  const currentPosts = heroes.slice(firstPostsIdx, lastPostsIdx)

  return (
    <div className='container'>
      {err === null ? <></> : <div className='error'>{err}</div>}
      <HeroInModal heroInModal={heroInModal} setHeroInModal={setHeroInModal}/>

      <Heroes heroes={currentPosts} choosedHero={choosedHero} deleteHero={deleteHero} editHero={editHero}/>

      <AddBtn openCloseModal={openCloseModal}/>
      <Pagination perPage={perPage} totalPosts={heroes.length} paginate={paginate} currentPage={currentPage} />
      {modal ? <Modal openCloseModal={openCloseModal} onImageChange={onImageChange} handleChange={handleChange} hero={hero} deleteImg={deleteImg} onAdd={onAdd} onEdit={onEdit} modalBtn={modalBtn}/> : <></>}
    </div>
  );
}

export default App;
