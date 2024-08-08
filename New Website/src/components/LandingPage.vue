<template>
    <header>
        <nav class="container max-w-screen-xl mx-auto flex items-center py-4 mt-4 sm:mt-12 px-4">
            <div class="py-1"><img src="../assets/logo-bookmark.svg" alt="" /></div>
            <ul class="hidden sm:flex flex-1 justify-end items-center gap-12 text-custom-blue uppercase text-xs">
                <!-- <li class="cursor-pointer">Features</li>
                <li class="cursor-pointer">Pricing</li>
                <li class="cursor-pointer">Contact</li> -->
                <router-link class="bg-custom-red text-white rounded-md px-7 py-3 uppercase" to="/login">Login</router-link>
                <router-link class="bg-custom-red text-white rounded-md px-7 py-3 uppercase" to="/signup">Sign Up</router-link>
            </ul>
            <div class="flex sm:hidden flex-1 justify-end" @click="toggleMenu">
                    <span class="material-icons cursor-pointer">menu</span>
            </div>
            <div v-if="isMenuOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div class="bg-white w-3/4 max-w-sm p-8 rounded-lg relative">
                  <button @click="toggleMenu" class="absolute top-3 right-3 text-gray-600">
                    <span class="material-icons">close</span>
                </button>
                <div class="flex flex-col space-y-4">
                    <router-link class="bg-custom-red text-white rounded-md px-7 py-3 uppercase text-center" to="/login" @click="toggleMenu">Login</router-link>
                    <router-link class="bg-custom-red text-white rounded-md px-7 py-3 uppercase text-center" to="/signup" @click="toggleMenu">Sign Up</router-link>
                  </div>
                </div>
            </div>
        </nav>
    </header>
    <!-- Hero -->
    <section class="relative overflow-hidden">
        <div class="container max-w-screen-xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28 px-4">
            <!-- Content -->
            <div class="flex flex-1 flex-col items-center lg:items-start">
                <h2 class="text-custom-blue text-3xl md:text-4xl lg:text-5xl text-center lg:text-left mb-6">
                    A Simple Bookmark Manager
                </h2>
                <p class="text-custom-grey text-lg text-center lg:text-left mb-6">
                    A clean and simple interface to organise your favourite websites. Open a new browser tab and see your sites load instantly. Try it for free
                </p>
                <div class="flex justify-center flex-wrap gap-6">
                    <button type="button" class="btn btn-purple hover:bg-custom-white hover:text-black">Get it on Chrome</button>
                    <button type="button" class="btn btn-white hover:bg-custom-purple hover:text-white">Get it on Firefox</button>
                </div>
            </div>

            <!-- Image -->
            <div class="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
                <img class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full" src="../assets/hero-bg.png" alt="" />
            </div>
        </div>
        <div class="hidden md:block overflow-hidden bg-custom-purple rounded-l-full absolute h-80 w-2/4 top-32 right-0 lg:-bottom-28 lg:-right-36"></div>
    </section>
    <!-- Features -->
    <section class="bg-custom-white py-20 mt-20 lg:mt-60 overflow-hidden">
        <!-- Heading -->
        <div class="sm:w-3/4 lg:w-5/12 mx-auto px-2">
            <h1 class="text-3xl text-center text-custom-blue">Features</h1>
            <p class="text-center text-custom-grey mt-4">
                Our aim is to make it quick and easy for you to access your favourite websites. Your bookmarks sync between
                your devices so you can access them on the go.
            </p>
        </div>
        <!-- Feature #1 -->
        <div class="relative mt-20 lg:mt-24">
            <div class="container max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-24 px-4">
            <!-- Image -->
                <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                    <img
                        class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
                        src="../assets/illustration-features-tab-1.png"
                        alt=""
                    />
                </div>
            <!-- Content -->
                <div class="flex flex-1 flex-col items-center lg:items-start">
                    <h1 class="text-3xl text-custom-blue">Bookmark in one click</h1>
                    <p class="text-custom-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                        Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control
                        over how you manage your favourite sites.
                    </p>
                    <button type="button" class="btn btn-purple hover:bg-custom-white hover:text-black">More Info</button>
                </div>
            </div>
            <!-- Rounded Rectangle -->
            <div class=" hidden lg:block overflow-hidden bg-custom-purple rounded-r-full absolute h-80 w-2/4 -bottom-24 -left-36"></div>
        </div>
        <!-- Feature #2 -->
        <div class="relative mt-20 lg:mt-52">
            <div class="container max-w-screen-xl mx-auto flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24 px-4">
                <!-- Image -->
                <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                    <img
                        class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
                        src="../assets/illustration-features-tab-2.png"
                        alt=""
                    />
                </div>
                <!-- Content -->
                <div class="flex flex-1 flex-col items-center lg:items-start">
                    <h1 class="text-3xl text-custom-blue">Intelligent search</h1>
                    <p class="text-custom-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                        Our powerful search feature will help you find saved sites in no time at all. No need to crawl through all
                        of your bookmarks.
                    </p>
                    <button type="button" class="btn btn-purple hover:bg-custom-white hover:text-black">More Info</button>
                </div>
            </div>
            <!-- Rounded Rectangle -->
            <div class="hidden lg:block overflow-hidden bg-custom-purple rounded-l-full absolute h-80 w-2/4 -bottom-24 -right-36"></div>
        </div>
        <!-- Feature #3 -->
        <div class="relative mt-20 lg:mt-52">
            <div class="container max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-24 px-4">
            <!-- Image -->
                <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
                    <img class="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full" src="../assets/illustration-features-tab-3.png" alt="" />
                </div>
            <!-- Content -->
                <div class="flex flex-1 flex-col items-center lg:items-start">
                    <h1 class="text-3xl text-custom-blue">Share your bookmarks</h1>
                    <p class="text-custom-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
                        Easily share your bookmarks and collections with others. Create a shareable link that you can send at the
                        click of a button.
                    </p>
                    <button type="button" class="btn btn-purple hover:bg-custom-white hover:text-black">More Info</button>
                </div>
            </div>
            <!-- Rounded Rectangle -->
            <div
                    class="
                    hidden
                    lg:block
                    overflow-hidden
                    bg-custom-purple
                    rounded-r-full
                    absolute
                    h-80
                    w-2/4
                    -bottom-24
                    -left-36
                    ">
            </div>
        </div>
        </section>

        <!-- Download -->
        <section class="py-20 mt-20">
        <!-- Heading -->
        <div class="sm:w-3/4 lg:w-5/12 mx-auto px-2">
            <h1 class="text-3xl text-center text-custom-blue">Download the extension</h1>
            <p class="text-center text-custom-grey mt-4">
                We've got more browsers in the pipeline. Please do let us know if you’ve got a favourite you’d like us to
                prioritize.
            </p>
        </div>
        <!-- Cards -->
        <div class="container max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-16 px-4">
            <!-- Card 1 -->
            <div class="flex flex-col rounded-md shadow-md lg:mb-16">
                <div class="p-6 flex flex-col items-center">
                    <img src="../assets/logo-chrome.svg" alt="" />
                    <h3 class="mt-5 mb-2 text-custom-blue text-lg">Add to Chrome</h3>
                    <p class="mb-2 text-custom-grey font-light">Minimum version 62</p>
                </div>
                <hr class="border-b border-custom-white" />
                <div class="flex p-6">
                    <button type="button" class="flex-1 btn btn-purple hover:bg-custom-white hover:text-black">
                        Add & Install Extension
                    </button>
                </div>
            </div>
            <!-- Card 2 -->
            <div class="flex flex-col rounded-md shadow-md lg:my-8">
                <div class="p-6 flex flex-col items-center">
                    <img src="../assets/logo-firefox.svg" alt="" />
                    <h3 class="mt-5 mb-2 text-custom-blue text-lg">Add to Firefox</h3>
                    <p class="mb-2 text-custom-grey font-light">Minimum version 62</p>
                </div>
                <hr class="border-b border-custom-white" />
                <div class="flex p-6">
                    <button type="button" class="flex-1 btn btn-purple hover:bg-custom-white hover:text-black">
                        Add & Install Extension
                    </button>
                </div>
            </div>
            <!-- Card 3 -->
            <div class="flex flex-col rounded-md shadow-md lg:mt-16">
                <div class="p-6 flex flex-col items-center">
                    <img src="../assets/logo-opera.svg" alt="" />
                    <h3 class="mt-5 mb-2 text-custom-blue text-lg">Add to Opera</h3>
                    <p class="mb-2 text-custom-grey font-light">Minimum version 62</p>
                </div>
                <hr class="border-b border-custom-white" />
                <div class="flex p-6">
                    <button type="button" class="flex-1 btn btn-purple hover:bg-custom-white hover:text-black">
                        Add & Install Extension
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="bg-custom-white py-20">
        <div class="container max-w-screen-xl mx-auto px-4">
            <!-- Heading -->
            <div class="sm:w-3/4 lg:w-5/12 mx-auto px-2">
                <h1 class="text-3xl text-center text-custom-blue">Frequently Asked Questions</h1>
                <p class="text-center text-custom-grey mt-4">
                    Here are some of our FAQs. If you have any other questions you'd like answered please feel free to email us.
                </p>
            </div>
            <!-- FAQ Items -->
            <div class="flex flex-col sm:w-3/4 lg:w-5/12 mt-12 mx-auto">
                <div v-for="(faq, index) in faqs" :key="index" class="border-b">
                    <div class="flex items-center py-4 cursor-pointer" @click="toggleFaq(index)">
                        <span class="flex-1">{{ faq.question }}</span>
                        <i :class="['fas', faq.open ? 'fa-chevron-up' : 'fa-chevron-down', 'text-custom-purple']"></i>
                    </div>
                    <div v-if="faq.open" class="py-2 text-gray-600">
                        {{ faq.answer }}
                    </div>
                </div>
                <!-- <button type="button" class="mt-12 flex self-center btn btn-purple hover:bg-custom-white hover:text-black">
                    More Info
                </button> -->
                </div>
            </div>
    </section>

    <!-- Contact Us -->
    <!-- <section class="bg-custom-purple text-white py-20">
        <div class="container max-w-screen-xl mx-auto px-4">
            <div class="sm:w-3/4 lg:w-2/4 mx-auto">
                <p class="font-light uppercase text-center mb-8">35,000+ ALREADY JOINED</p>
                <h1 class="text-3xl text-center">Stay up-to-date with what we’re doing</h1>
                <div class="flex flex-col sm:flex-row gap-6 mt-8">
                    <input
                        type="text"
                        placeholder="Enter your email address"
                        class="focus:outline-none flex-1 px-2 py-3 rounded-md text-black"
                    />
                    <button type="button" class="btn bg-custom-red hover:bg-custom-white hover:text-black">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    </section> -->

    <!-- Footer -->
    <footer class="bg-custom-blue py-8">
        <div class="container max-w-screen-xl mx-auto flex flex-col md:flex-row items-center px-4">
            <div class="flex flex-1 flex-wrap items-center justify-center md:justify-start gap-12">
                <img src="../assets/logo-custom-white.png" alt="" />
                <ul class="flex text-white uppercase gap-12 text-xs">
                    <li class="cursor-pointer">Features</li>
                    <li class="cursor-pointer">Pricing</li>
                    <li class="cursor-pointer">Contact</li>
                </ul>
        </div>
        <div class="flex gap-10 mt-12 md:mt-0">
            <li><i class="text-white text-2xl fab fa-twitter"></i></li>
            <li><i class="text-white text-2xl fab fa-facebook-square"></i></li>
        </div>
        </div>
    </footer>
</template>

<script setup>
import { reactive } from 'vue'
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const faqs = reactive([
    {
        question: 'What is a Bookmark?',
        answer: 'A bookmark is a saved shortcut that directs your browser to a specific webpage.',
        open: false
    },
    {
        question: 'How can I request a new browser?',
        answer: 'You can request a new browser by contacting our support team.',
        open: false
    },
    {
        question: 'Is there a mobile app?',
        answer: 'Yes, our mobile app is available on both iOS and Android.',
        open: false
    },
    {
        question: 'What about other Chromium browsers?',
        answer: 'Our extension works with most Chromium-based browsers.',
        open: false
    }
])

const toggleFaq = (index) => {
    faqs[index].open = !faqs[index].open
}
</script>

<style scoped>
@import '../style.css'

</style>
