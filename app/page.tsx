'use client';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Slide } from '@mui/material'

const emoji = [
  '🎃', '👻', '😱', '💀', '🕸️', '⚰️', '💸',
  '<img style="max-width: 50px" src="/fawcett.jpg">',
  '<img style="max-width: 50px" src="/hughes.png">',
  '<img style="max-width: 50px" src="/exam.png">',
  '<img style="max-width: 50px" src="/fminus.png">'
]

const addCircle = (delay: number, range: number[], color: string, circles: any[]) => {
  setTimeout(() => {
    // @ts-ignore
    let c = new Circle(range[0] + Math.random() * range[1], 80 + Math.random() * 4, color, {
      x: -0.15 + Math.random() * 0.3,
      y: 1 + Math.random() * 1
    }, range);
    circles.push(c);
  }, delay);
}

function Circle (x: number, y: number, c: string, v: { x: number, y: number }, range: number[]) {

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0); 

  const container = document.getElementById('animate');

  const maxWidth = container?.parentElement?.offsetWidth || 0;

  let _this = this;
  this.x = x % (maxWidth / 2);
  this.y = y;
  this.color = c;
  this.v = v;
  this.range = range;
  this.element = document.createElement('span');
  this.element.style.opacity = 0;
  this.element.style.position = 'absolute';
  this.element.style.fontSize = '50px';
  this.element.style.color = 'hsl('+(Math.random()*360|0)+',80%,50%)';
  this.element.innerHTML = c;
  container?.appendChild(this.element);

  this.update = function() {
    if (_this.y > 800) {
      _this.y = 80 + Math.random() * 4
      _this.x = _this.range[0] + Math.random() * _this.range[1] % (maxWidth / 2)
    }
    _this.y += _this.v.y;
    _this.x += _this.v.x;
    this.element.style.opacity = 1;
    this.element.style.transform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
    this.element.style.webkitTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
    this.element.style.mozTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
  };
}


const NameForm = (props: { handleSubmit: (e: any) => void }) => {

  const [show, setShow] = useState(true)

  return (
    <Slide direction="left" in={show} mountOnEnter unmountOnExit>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Hi, what&apos;s your name?
        </h1>
        <form className="flex flex-col items-center w-full max-w-lg mx-auto mt-6" id="nameForm" onSubmit={(e: any) => {
          e.preventDefault();
          props.handleSubmit(e)
          setShow(false)
        }}>
          <label htmlFor="name" className="sr-only">Name</label>
          <input id="name" required name="name" type="text" placeholder="Your name" className="w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
          <button type="submit" className="inline-flex items-center justify-center px-6 py-3 mt-6 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Continue
          </button>
        </form>
      </div>
    </Slide>
  )
}

const Invoice = (props: { name: string }) => {

  const [show, setShow] = useState(true)

  useEffect(() => {
    let circles: any[] = [];

    for (let i = 0; i < 10; i++) {
      addCircle(i * 150, [10 + 0, 300], emoji[Math.floor(Math.random() * emoji.length)], circles);
      addCircle(i * 150, [10 + 0, -300], emoji[Math.floor(Math.random() * emoji.length)], circles);
      addCircle(i * 150, [10 - 200, -300], emoji[Math.floor(Math.random() * emoji.length)], circles);
      addCircle(i * 150, [10 + 200, 300], emoji[Math.floor(Math.random() * emoji.length)], circles);
      addCircle(i * 150, [10 - 400, -300], emoji[Math.floor(Math.random() * emoji.length)], circles);
      addCircle(i * 150, [10 + 400, 300], emoji[Math.floor(Math.random() * emoji.length)], circles);
      addCircle(i * 150, [10 - 600, -300], emoji[Math.floor(Math.random() * emoji.length)], circles);
      addCircle(i * 150, [10 + 600, 300], emoji[Math.floor(Math.random() * emoji.length)], circles);
    }

    const animate = () => {
      for (let i in circles) {
        circles[i].update();
      }
      requestAnimationFrame(animate);
    }

    animate();
  }, [])

  return (
    <>
    <div id="animate" style={{
      margin: "0 auto",
      width: "20px",
      overflow: "visible",
      position: "relative"
    }}></div>
    <Slide direction="left" in={show} mountOnEnter unmountOnExit>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 text-left">
        <h1 className="mb-8 text-3xl font-bold tracking-tight leading-none text-gray-900 dark:text-white">
          FROM: Finance - Hughes Hall
        </h1>
        <p className="my-4">
          Dear <b>{props.name}</b>,
        </p>
        <p className="my-4">
          Thank you for submitting your Financial Undertaking Form along with any supporting evidence as requested.
        </p>
        <p className="my-4">
          We expect all students who are self-funding to settle their first year of fees in full in advance of arriving for registration.
        </p>
        <p className="my-4">
          Attached is our &apos;Fees Request for Pre-Payment&apos;.
        </p>
        <p className="my-4">
          Please make payment of 
          <span className="text-red-500 text-2xl font-bold"> £48,263.00  </span>
          by and no later than 15th of September 2023. If paying from an International bank this can take several days.
        </p>
        <p className="my-4">
          Please note that we are unable to confirm your membership until we have received your payment in our bank account.
        </p>
        <p className="my-4">
          To be able to study in the UK, you will need a Visa. Please only make payment when you have received notification of your successful Visa application.
        </p>
        <p className="my-4">
          Please ensure you pay all transfer charges payee & payer.
        </p>
        <p className="my-4">
          Payment should be sent by bank transfer to:
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4">
          <p className="my-2">
            <b>Account Name</b> Hughes Hall, University of Cambridge
          </p>
          <p className="my-2">
            <b>Account Number</b> 7777 7360
          </p>
          <p className="my-2">
            <b>Sort Code</b> 30-64-42
          </p>
          <p className="my-2">
            <b>IBAN</b> GB72LOYD30644277777360
          </p>
          <p className="my-2">
            <b>Swift Code</b> LOYDGB21670
          </p>
          <p className="my-2">
            <b>Address</b> Lloyds Bank, 3 Sidney Street, Cambridge, CB2 3HQ
          </p>
        </div>
        <p className="my-4">
          Please ensure that you include your full name in the reference.
        </p>
        <p className="my-4">
          Regards
        </p>
        <p className="my-4">
          Finance Office
        </p>
      </div>
    </Slide>
    </>
  )
}

export default function Home() {

  const [name, setName] = useState('')

  const submit = (e: any) => {
    const name = document.getElementById('name')
    if (name) setName((name as HTMLInputElement).value)
  }

  return (
    <main className="flex min-h-screen flex-col justify-between py-24 px-8">
      <section >
        {name ? <Invoice name={name} /> : <NameForm handleSubmit={submit} />}
      </section>
    </main>
  )
}
