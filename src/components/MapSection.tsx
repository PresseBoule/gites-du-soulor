import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { MapPin, Navigation, Maximize2 } from 'lucide-react';
import { EditableWrapper } from './admin/EditableWrapper';

export function MapSection() {
  const ref = useRef(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current || map) return;

    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      // Import Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Coordinates for 42 route du soulor 65400 arrens-marsous
      const coordinates: [number, number] = [42.9686, -0.2164];

      // Create map
      const newMap = L.map(mapRef.current!).setView(coordinates, 13);

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(newMap);

      // Custom icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="position: relative;">
            <div style="
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #c4a574 0%, #b89560 100%);
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 3px solid white;
              box-shadow: 0 8px 24px rgba(196, 165, 116, 0.4);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                transform: rotate(45deg);
                color: white;
                font-size: 20px;
              ">📍</div>
            </div>
            <div style="
              position: absolute;
              top: 50px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(58, 74, 90, 0.95);
              color: white;
              padding: 8px 12px;
              border-radius: 8px;
              white-space: nowrap;
              font-size: 14px;
              font-weight: 500;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              border: 1px solid rgba(196, 165, 116, 0.3);
            ">Les Gîtes du Soulor</div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      // Add marker
      L.marker(coordinates, { icon: customIcon })
        .addTo(newMap)
        .bindPopup(`
          <div style="font-family: sans-serif; padding: 8px;">
            <strong style="color: #c4a574; font-size: 16px;">Les Gîtes du Soulor</strong>
            <p style="margin: 8px 0; color: #555;">42 route du Soulor<br>65400 Arrens-Marsous</p>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=42.9686,-0.2164" 
              target="_blank"
              rel="noopener noreferrer"
              style="
                display: inline-block;
                margin-top: 8px;
                padding: 6px 12px;
                background: linear-gradient(135deg, #c4a574 0%, #b89560 100%);
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-size: 13px;
                font-weight: 500;
              "
            >
              Obtenir l'itinéraire
            </a>
          </div>
        `);

      setMap(newMap);

      // Cleanup
      return () => {
        newMap.remove();
      };
    });
  }, [map]);

  const handleRecenter = () => {
    if (map) {
      map.setView([42.9686, -0.2164], 13);
    }
  };

  return (
    <section
      ref={ref}
      id="location-map"
      className="py-20 bg-gradient-to-b from-[#34495e] to-[#2c3e50] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#c4a574]/20 to-[#7a9fbf]/20 border border-[#c4a574]/30 text-[#c4a574] backdrop-blur-sm">
              Localisation
            </span>
          </motion.div>

          <EditableWrapper
            path="texts.mapTitre"
            defaultValue="Nous Trouver"
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-wide"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg"
          >
            <EditableWrapper
              path="texts.mapDescription"
              defaultValue="Au cœur des Pyrénées, à Arrens-Marsous"
              as="p"
              className="text-white/70"
            />
          </motion.div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Map wrapper with border and shadow */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#c4a574]/30 shadow-2xl bg-[#3a4a5a]">
            {/* Map */}
            <div 
              ref={mapRef} 
              className="w-full h-[500px] md:h-[600px] relative z-10"
              style={{ background: '#3a4a5a' }}
            />

            {/* Recenter button */}
            <motion.button
              onClick={handleRecenter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 z-[1000] w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              title="Recentrer la carte"
            >
              <Maximize2 className="w-5 h-5 text-[#3a4a5a]" />
            </motion.button>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#c4a574] rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#c4a574] rounded-br-2xl pointer-events-none" />
          </div>

          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 grid md:grid-cols-2 gap-6"
          >
            {/* Address */}
            <div className="bg-gradient-to-br from-[#3a4a5a]/80 to-[#2c3e50]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c4a574] to-[#b89560] flex items-center justify-center shadow-lg shadow-[#c4a574]/30 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-2">Adresse</h3>
                  <p className="text-white/70 leading-relaxed">
                    42 route du Soulor<br />
                    65400 Arrens-Marsous<br />
                    France
                  </p>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="bg-gradient-to-br from-[#3a4a5a]/80 to-[#2c3e50]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c4a574] to-[#b89560] flex items-center justify-center shadow-lg shadow-[#c4a574]/30 flex-shrink-0">
                  <Navigation className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-2">Itinéraire</h3>
                  <p className="text-white/70 mb-4">
                    Cliquez pour obtenir votre itinéraire via Google Maps
                  </p>
                  <motion.a
                    href="https://www.google.com/maps/dir/?api=1&destination=42.9686,-0.2164"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c4a574] to-[#b89560] text-white shadow-lg shadow-[#c4a574]/30 hover:from-[#b89560] hover:to-[#c4a574] transition-all duration-300"
                  >
                    <Navigation className="w-4 h-4" />
                    Obtenir l'itinéraire
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#c4a574]/5 blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#7a9fbf]/5 blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
}
