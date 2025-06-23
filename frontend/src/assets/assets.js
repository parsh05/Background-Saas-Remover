import logo from "./logo.png";
import people from "./people.png";
import people_org from "./people-org.png";
import animal from "./animal.png";
import animal_org from "./animal-org.jpg";
import car from "./car.png";
import car_org from "./car-org.jpg";
import product from "./product.png";
import product_org from "./product_org.png";
import graphics from "./graphic.png";
import graphics_org from "./graphic-org.png";

import video_banner from "./removebackground-animation_h-264.mp4";
import slider from "./slide_icon.svg";
import credits from "./credits.png";

export const assets = {
  logo,
  video_banner,
  slider,
  credits,
};

export const categoryImages = {
  people: { original: people_org, processed: people },
  products: { original: product_org, processed: product },
  animals: { original: animal_org, processed: animal },
  cars: { original: car_org, processed: car },
  graphics: { original: graphics_org, processed: graphics },
};

// Keep category keys lowercase
export const categories = ["people", "products", "animals", "cars", "graphics"];

export const steps = [
  {
    step: "step 1",
    title: "Upload Your Image",
    description:
      "Start by selecting the image you want to edit. You can drag and drop it into the upload area or browse from your device. Our system supports all major image formats like JPG, PNG, and JPEG, and ensures your file is safely processed.",
  },
  {
    step: "step 2",
    title: "Automatic Background Removal",
    description:
      "Once uploaded, our AI-powered engine quickly analyzes your image to detect the subject and remove the background with high precision. The process takes just a few seconds, and no manual editing is required — though you can fine-tune it if needed.",
  },
  {
    step: "step 3",
    title: "Download Your Result",
    description:
      "After the background is removed, you’ll get a clean preview of your new image. Choose from multiple download formats, such as transparent PNG or white background JPG, and save it directly to your device — ready for social media, design work, or professional use.",
  },
];

export const plans = [
  {
    id: 1,
    name: "Basic",
    price: "₹499",
    credits: 100,
    description:
      "Try out the service with 100 background removals. Ideal for occasional users.",
    popular: false,
  },
  {
    id: 2,
    name: "Pro",
    price: "₹849",
    credits: 250,
    description:
      "Great for content creators and freelancers who need frequent background removal.",
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "₹1499",
    credits: 1000,
    description:
      "Perfect for businesses and agencies with high-volume image editing needs.",
    popular: false,
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "This background remover saved me hours of editing. It’s fast, accurate, and incredibly easy to use!",
    author: "Aman Verma",
    handle: "@aman.designs",
  },
  {
    id: 2,
    quote:
      "As a freelance photographer, this tool has become part of my daily workflow. Highly recommended!",
    author: "Neha Sharma",
    handle: "@neha.photo",
  },
  {
    id: 3,
    quote:
      "I was amazed at how clean the cutouts were. No more fiddling with manual background removal!",
    author: "Rahul Khanna",
    handle: "@rahul.editor",
  },
];

export const FOOTER_CONSTANTS = [
  {
    url: "https://www.instagram.com/pksingh_2902",
    logo: "https://img.icons8.com/fluent/30/000000/instagram-new.png", // or use imported asset like assets.instagram
  },
  {
    url: "https://www.discord.com/yourpage",
    logo: "https://img.icons8.com/fluent/30/000000/discord.png",
  },
  {
    url: "https://twitter.com/yourpage",
    logo: "https://img.icons8.com/fluent/30/000000/twitter.png",
  },
  {
    url: "https://www.linkedin.com/in/parshant05/",
    logo: "https://img.icons8.com/fluent/30/000000/linkedin.png",
  },
];
