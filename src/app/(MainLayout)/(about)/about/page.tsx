import Image from "next/image";

import Container from "@/src/components/UI/Container";

const AboutPage = () => {
  return (
    <div>
      <Container>
        {/* page header */}
        <div className="flex flex-col items-center text-center gap-4 font-medium py-14 md:py-16 lg:py-20">
          <span className="text-sm font-semibold border rounded-full px-3 py-1">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-50 pt-2 max-w-screen-lg">
            Yummy is bringing recipe sharing back to life with ease.
          </h1>
          <p className="font-medium md:text-lg">
            Stop struggling with outdated platforms. Its time to start savoring
            the joy of sharing.
          </p>
        </div>
        {/* images gallery section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <Image
              alt="recipe image"
              className="w-full h-full object-cover rounded-xl"
              height={200}
              src="https://www.allrecipes.com/thmb/MBM49JvXs7YaGye2-BaFOrx1k3E=/771x514/filters:no_upscale():max_bytes(150000):strip_icc():focal(2283x1488:2285x1490):format(webp)/AR-Pizza-Lava-Toast-4x3-0de18c7a898346dfab1ede9f00471aed.jpg"
              width={270}
            />
          </div>
          <div className="md:col-span-6">
            <Image
              alt="recipe image"
              className="w-full h-full object-cover rounded-xl"
              height={200}
              src="https://www.allrecipes.com/thmb/4hg3vuRbTBRbAeEmptAx2L__Ey0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/14522-Pizza-On-The-Grill100-4x3-a8027c29a77c41468ad65b0f439b0d50.jpg"
              width={270}
            />
          </div>
          <div className="md:col-span-3">
            <Image
              alt="recipe image"
              className="w-full h-full object-cover rounded-xl"
              height={200}
              src="https://www.allrecipes.com/thmb/MX_t_NcMlM4dekf7N8xgLZO_bTk=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-76296-Meat-Pie-DDMFS-4x3-beauty-f987781548f14bfcb0cb282f598e4e60.jpg"
              width={270}
            />
          </div>
        </div>
        {/* our mission section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between py-16">
          <div className="md:col-span-2">
            <h1 className="text-slate-900 dark:text-slate-50 text-2xl md:text-3xl font-extrabold mb-4">
              Your Vision
            </h1>
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              We envision a vibrant community where food lovers, home cooks, and
              culinary enthusiasts come together to share, explore, and
              celebrate the art of cooking. Our platform inspires creativity and
              connection through the universal language of food.
            </p>
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              By revolutionizing the way recipes are shared and discovered, we
              empower individuals to explore new cuisines, perfect their skills,
              and express their culinary passion. Join us in building a
              community where every recipe tells a story and every cook finds
              their voice.
            </p>
          </div>
          <div className="bg-primary dark:bg-primary-50 text-white p-6 rounded-md">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4">
              Our Mission
            </h1>
            <p className="font-medium">
              We aim to create a seamless platform for discovering, sharing, and
              preserving recipes. By fostering a collaborative environment, we
              empower cooks of all levels to connect, learn, and grow. Together,
              we celebrate the joy of cooking and the love of sharing meals.
            </p>
          </div>
        </div>

        {/* our team section */}
        <div className="py-8 md:py-12">
          <h1 className="text-slate-900 dark:text-slate-50 text-3xl md:text-4xl font-extrabold mb-4 text-center">
            Meet Our Team
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl font-medium text-center">
            Our team united by passion, driven by excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-10">
            <div className="min-h-96 bg-gradient-to-t from-black to-zinc-500 relative flex justify-center rounded-lg">
              <Image
                alt="team member image"
                className="bg-cover object-cover bg-center mix-blend-overlay h-full w-full"
                height={200}
                src="https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727308800&semt=ais_hybrid"
                width={270}
              />
              <div className="text-center text-white py-6 absolute bottom-2">
                <h3 className="text-xl font-bold">Adrian</h3>
                <p className="font-semibold">Team Leader</p>
              </div>
            </div>
            <div className="min-h-96 bg-gradient-to-t from-black to-zinc-400 relative flex justify-center rounded-lg">
              <Image
                alt="team member image"
                className="bg-cover object-cover bg-center mix-blend-overlay h-full w-full"
                height={200}
                src="https://static.vecteezy.com/system/resources/previews/024/344/084/non_2x/businessman-isolated-illustration-ai-generative-free-png.png"
                width={270}
              />
              <div className="text-center text-white py-6 absolute bottom-2">
                <h3 className="text-xl font-bold">Anto</h3>
                <p className="font-semibold">Chief Executive Officer</p>
              </div>
            </div>
            <div className="min-h-96 bg-gradient-to-t from-black to-zinc-400 relative flex justify-center rounded-lg">
              <Image
                alt="team member image"
                className="bg-cover object-cover bg-center mix-blend-overlay h-full w-full"
                height={200}
                src="https://www.pngall.com/wp-content/uploads/15/Man-In-Suit-PNG-Pic.png"
                width={270}
              />
              <div className="text-center text-white py-6 absolute bottom-2">
                <h3 className="text-xl font-bold">Andrew</h3>
                <p className="font-semibold">Designer</p>
              </div>
            </div>
            <div className="min-h-96 bg-gradient-to-t from-black to-zinc-500 relative flex justify-center rounded-lg">
              <Image
                alt="team member image"
                className="bg-cover object-cover bg-center mix-blend-overlay h-full w-full"
                height={200}
                src="https://i.pinimg.com/736x/dd/ca/f4/ddcaf4fb59a7be7af7c6cf34abf18c1c.jpg"
                width={270}
              />
              <div className="text-center text-white py-6 absolute bottom-2">
                <h3 className="text-xl font-bold">Lucass Finn</h3>
                <p className="font-semibold">Marketing Manager</p>
              </div>
            </div>
          </div>
        </div>
        {/* history and achievement section */}
        {/* <HistorySection /> */}
        {/* contact section */}
        {/* <ContactSection /> */}
      </Container>
    </div>
  );
};

export default AboutPage;
