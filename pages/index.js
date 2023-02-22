import Head from 'next/head'
import Image from 'next/image'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import 'bulma/css/bulma.min.css'
import { Button, Container, Heading, Section } from 'react-bulma-components'
import React, { useState } from 'react'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const [files, setFiles] = useState({ front: null, back: null })
  const [pref, setPref] = useState({ photo: true, current: 'front' })

  const handlePhotoData = (photoData, current) => {
    setFiles({ ...files, [`${current}`]: photoData })
  }
  const toggleCurrent = () => {
    setPref({ ...pref, current: pref.current === 'front' ? 'back' : 'front' })
  }
  const toggleInput = () => {
    setPref({ ...pref, photo: !pref.photo })
  }
  const resetInput = () => {
    setFiles({ front: null, back: null })
  }
  const handleFileData = (data, current) => {
    setFiles({
      ...files,
      [`${current}`]: URL.createObjectURL(data.target.files[0]),
    })
  }
  const uploadData = () => {
    // TODO: Implement tus client logic.
  }

  return (
    <>
      <Head>
        <title>ID Verify</title>
        <meta name="description" content="Example Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container>
          <Heading>Identity Verification</Heading>
          <Heading subtitle>
            A <strong>simple</strong> demonstration of ID verification.
          </Heading>
        </Container>
      </Section>
      <div className={styles.singleGrid}>
        <div>
          <Section>
            <Container>
              <Heading>Add Your ID</Heading>
              <p>
                You will need to add the <strong>front</strong> and{' '}
                <strong>back</strong> of your identification card (
                <strong>ID</strong>).
              </p>
              <br />
              <p>
                Let&apos;s start with the front or back of the card. Then
                manually select, or take a picture of your ID!
              </p>
              <div className={styles.duoGrid}>
                <Button
                  color="info"
                  onClick={toggleInput}
                  disabled={files[pref.current]}
                >
                  {pref.photo ? 'Add File' : 'Take Photo'}
                </Button>
                <Button color="info" onClick={resetInput}>
                  Reset
                </Button>
                <Button color="info" onClick={toggleCurrent}>
                  {pref.current === 'front'
                    ? 'Switch to Back'
                    : 'Switch to Front'}
                </Button>
                <Button
                  color="success"
                  disabled={files.back && files.front ? false : true}
                  onClick={uploadData}
                >
                  Upload
                </Button>
              </div>
              <center>
                <strong>
                  {pref.current === 'front' ? 'The Front' : 'The Back'}
                </strong>
              </center>
              <div className={styles.flexCenter}>
                {files[pref.current] ? (
                  <Image
                    src={files[pref.current]}
                    alt="front"
                    width={'450'}
                    height={'250'}
                  />
                ) : (
                  <div style={{ maxWidth: '450px' }}>
                    {pref.photo ? (
                      <Camera
                        onTakePhoto={(data) => {
                          handlePhotoData(data, pref.current)
                        }}
                      />
                    ) : (
                      <input
                        type="file"
                        onChange={(data) => handleFileData(data, pref.current)}
                      />
                    )}
                  </div>
                )}
              </div>
            </Container>
          </Section>
        </div>
      </div>
    </>
  )
}
