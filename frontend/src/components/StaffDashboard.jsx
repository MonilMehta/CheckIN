import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, X, Camera, Send, Loader2 } from "lucide-react";
import { useAuth } from '../AuthContext';
import axios from 'axios';

const StaffDashboard = () => {
  const location = useLocation();
  const { roomNumber } = location.state || {};
  const [filesCleanliness, setFilesCleanliness] = useState([]);
  const [filesInventory, setFilesInventory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { token } = useAuth();

  const handleFileChange = (event, setFiles, currentFiles) => {
    const uploadedFiles = Array.from(event.target.files);
    const validFiles = uploadedFiles.filter(file => file.type.startsWith('image/'));
    setFiles([...currentFiles, ...validFiles]);
  };

  const handleRemoveImage = (index, setFiles, currentFiles) => {
    const updatedFiles = [...currentFiles];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Cleanliness submission
      const cleanlinessFormData = new FormData();
      cleanlinessFormData.append('room_number', roomNumber);
      filesCleanliness.forEach((file) => {
        cleanlinessFormData.append('room_image', file);
      });

      await axios.post('http://127.0.0.1:8000/api/createroom/', cleanlinessFormData, {
        headers: { Authorization: `Token ${token}` },
      });

      // Inventory submission
      await Promise.all(
        filesInventory.map(async (file) => {
          const inventoryFormData = new FormData();
          inventoryFormData.append('room_number', roomNumber);
          inventoryFormData.append('image', file);
          return axios.post('http://127.0.0.1:8000/api/inventory-check/', inventoryFormData, {
            headers: { Authorization: `Token ${token}` },
          });
        })
      );

      setFilesCleanliness([]);
      setFilesInventory([]);
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ImagePreview = ({ file, onRemove, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative rounded-lg overflow-hidden"
    >
      <img
        src={URL.createObjectURL(file)}
        alt={`Preview ${index + 1}`}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-100 transition-colors"
        >
          <X className="h-4 w-4 text-red-600" />
        </button>
      </div>
    </motion.div>
  );

  const UploadSection = ({ title, files, setFiles, currentFiles }) => (
    <Card className="w-full mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <Button
            variant="outline"
            className="relative overflow-hidden"
            onClick={() => document.getElementById(`${title}-upload`).click()}
          >
            <input
              id={`${title}-upload`}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, setFiles, currentFiles)}
            />
            <Upload className="h-4 w-4 mr-2" />
            Upload Images
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <AnimatePresence>
            {currentFiles.map((file, index) => (
              <ImagePreview
                key={`${file.name}-${index}`}
                file={file}
                index={index}
                onRemove={() => handleRemoveImage(index, setFiles, currentFiles)}
              />
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Room Inspection</h1>
          <p className="text-gray-600 mt-2">Room Number: {roomNumber}</p>
        </motion.div>

        <UploadSection
          title="Cleanliness Check"
          files={setFilesCleanliness}
          currentFiles={filesCleanliness}
          setFiles={setFilesCleanliness}
        />

        <UploadSection
          title="Inventory Check"
          files={setFilesInventory}
          currentFiles={filesInventory}
          setFiles={setFilesInventory}
        />

        {submitStatus && (
          <Alert className={submitStatus === 'success' ? 'bg-green-50' : 'bg-red-50'}>
            <AlertDescription>
              {submitStatus === 'success' 
                ? 'Images uploaded successfully!' 
                : 'Error uploading images. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        <motion.div className="mt-8 flex justify-center">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting || (!filesCleanliness.length && !filesInventory.length)}
            className={`w-full max-w-xs ${
              isSubmitting ? 'opacity-80' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Inspection
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default StaffDashboard;