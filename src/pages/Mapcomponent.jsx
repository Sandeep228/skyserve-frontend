import  { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Button, Heading } from "@chakra-ui/react";
import { EditControl } from "react-leaflet-draw";
import axios from "axios";

const Mapcomponent = () => {
  const [geoData, setGeoData] = useState(null);
  const [drawnFIG, setDrawnFIG] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result;
      console.log("File content:", fileContent);

      if (file.name.endsWith(".geojson")) {
        const parsedData = JSON.parse(fileContent);
        setGeoData(parsedData);
      } else if (file.name.endsWith(".kml")) {
        console.log("KML file detected");
      } else {
        console.error("Unsupported file format");
      }
    };

    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleShape = (e) => {
    const layer = e.layer;
    setDrawnFIG(layer.toGeoJSON());
    setGeoData(layer.toGeoJSON());
  };

  const saveGeoJSON = async () => {
    const token = localStorage.getItem("token");
    try {
      const userId = localStorage.getItem("userId");
      console.log("UserID:", userId);

      const response = await axios.patch(
        `https://skyserve-backend-1iio.onrender.com//users/saveGeoJSON/${userId}`,
        { GeoJSONData: geoData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);
      console.log("GeoJSON data saved successfully!", { GeoJSONData: geoData });
      setDrawnFIG(null);
      setGeoData(null);
    } catch (error) {
      console.error("Error saving GeoJSON data:", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "850px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 40px 10px 10px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "700px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 40px 10px 10px",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            width: "30%",
            height: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              boxShadow: "1px 7px 9px 1px",
              backgroundColor: "#acdcee",
              justifyContent: "center",
              borderRadius: "10px",
              width: "85%",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              textAlign: "center",
            }}
          >
            <Heading>Drop GeoJSON or KML file</Heading>
            <form>
              <div
                {...getRootProps()}
                style={{ width: "100%", textAlign: "center" }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p style={{ color: "#2e94b9" }}>Drop the file here ...</p>
                ) : (
                  <p style={{ color: "#2e94b9" }}>
                    Drag and  drop a GeoJSON or KML file here, or click to select
                    files
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        <div
          style={{
            boxShadow: "1px 7px 9px 1px",
            borderRadius: "10px",
            width: "70%",
            height: "600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapContainer
            center={[21.0, 78.0]}
            zoom={2.1}
            style={{ height: "600px", borderRadius: "10px", width: "100%" }}
          >
            <FeatureGroup>
              <EditControl position="topright" onCreated={handleShape} />
              {geoData && <GeoJSON data={geoData} />}
            </FeatureGroup>

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
      </div>
      {geoData && (
        <div
          style={{
            backgroundColor: "#2e94b9",
            borderRadius: "10px",
            width: "96%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            padding: "20px",
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 style={{ margin: "0" }}>Shape Coordinates:</h2>
            <p style={{ margin: "0", marginLeft: "10px" }}>
              {JSON.stringify(drawnFIG.geometry.coordinates, null, 2)}
            </p>
          </div>
          <div>
            <Button
              onClick={saveGeoJSON}
              w="100px"
              bg="white"
              color="#2e94b9"
              borderRadius="5px"
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mapcomponent;
