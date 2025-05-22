/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  IoChevronBackOutline,
  IoTimeOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { HiOutlineUpload } from "react-icons/hi";
import "./create-campaign.css";
import { PiCaretDown } from "react-icons/pi";
import { X } from "lucide-react";
import { toast } from "sonner";
import apiClient from "../api/utils";

export default function CreateCampaign({ onBack }) {
  const [campaign, setCampaign] = useState({
    title: "",
    startDate: "",
    endDate: "",
    category: "",
    endTime: "",
    coverImage: null,
    coverVideo: null,
    description: "",
    contributionType: "",
    targetAmount: "",
    hasPaymentOptions: false,
    allowOtherPledges: true,
    isPublic: false,
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverVideo, setCoverVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCampaign({
      ...campaign,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageData = null;
      let coverVideoData = null;

      if (coverImage) {
        const reader = new FileReader();
        coverImageData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(coverImage);
        });
      }

      if (coverVideo) {
        const reader = new FileReader();
        coverVideoData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(coverVideo);
        });
      }

      const campaignData = {
        title: campaign.title || "",
        description: campaign.description || "",
        startDate: campaign.startDate
          ? new Date(campaign.startDate).toISOString()
          : "",
        endDate: campaign.endDate
          ? new Date(campaign.endDate).toISOString()
          : "",
        category: campaign.category || "",
        endTime: campaign.endTime || "",
        contributionType: campaign.contributionType
          ? campaign.contributionType.toUpperCase()
          : "FLEXIBLE",
        targetAmount: parseFloat(campaign.targetAmount) || 0,
        hasPaymentOptions: campaign.hasPaymentOptions || false,
        allowOtherPledges: campaign.allowOtherPledges || false,
        isPublic: campaign.isPublic || false,
      };

      if (coverImageData) campaignData.coverImage = coverImageData;
      if (coverVideoData) campaignData.coverVideo = coverVideoData;

      const response = await apiClient.post("/campaign/create", campaignData);

      toast.success("Campaign created successfully!");
      console.log("Campaign created:", response.data);
      setCampaign({
        title: "",
        startDate: "",
        endDate: "",
        category: "",
        endTime: "",
        coverImage: "",
        coverVideo: "",
        description: "",
        contributionType: "",
        targetAmount: "",
        hasPaymentOptions: false,
        allowOtherPledges: true,
        isPublic: false,
      });
      setCoverImage(null);
      setCoverVideo(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error creating campaign:", error);

      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Server error occurred";
        toast.error(`Failed to create campaign: ${errorMessage}`);
      } else if (error.request) {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } else {
        toast.error("Failed to create campaign. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const previewMedia = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      if (file.type.startsWith("image/")) {
        setCoverImage(file);
        setCoverVideo(null);
      } else if (file.type.startsWith("video/")) {
        setCoverVideo(file);
        setCoverImage(null);
      }
    }
  };

  const removePreview = () => {
    setCoverImage(null);
    setCoverVideo(null);
    setPreviewUrl(null);
  };

  const categories = [
    { value: "charity", label: "Charity" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health" },
    { value: "environment", label: "Environment" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="create-campaign">
      <div className="campaign-header">
        <h1>Create Campaign</h1>
        <button className="back-button" onClick={onBack}>
          <IoChevronBackOutline color="#4E5D78" /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#328be0" }}>
            Campaign Details
          </h2>

          <div className="form-group">
            <label htmlFor="title">
              Campaign Title<span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g. Special needs children"
              value={campaign.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">
                Campaign Start Date<span className="required">*</span>
              </label>

              <input
                type="date"
                id="startDate"
                name="startDate"
                placeholder="Select date"
                value={campaign.startDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">
                Campaign Due Date<span className="required">*</span>
              </label>

              <input
                type="date"
                id="endDate"
                name="endDate"
                placeholder="Select date"
                value={campaign.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <div className="select-wrapper">
              <select
                id="category"
                name="category"
                value={campaign.category}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Choose category
                </option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="endTime">
              Campaign Due Time<span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <input
                type="text"
                id="endTime"
                name="endTime"
                placeholder="0:00 PM"
                value={campaign.endTime}
                onChange={handleInputChange}
                required
              />
              <IoTimeOutline className="input-icon" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter a description..."
              rows="5"
              value={campaign.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Upload cover image/Video</label>
            {previewUrl ? (
              <div className="media-preview" style={{ position: "relative" }}>
                {coverImage && <img src={previewUrl} alt="Cover Preview" />}
                {coverVideo && <video src={previewUrl} controls />}
                <button
                  type="button"
                  onClick={removePreview}
                  className="remove-preview-button"
                >
                  <X size={16} color="white" />
                </button>
              </div>
            ) : (
              <div
                className="upload-box"
                onClick={() => document.getElementById("fileUpload").click()}
              >
                <HiOutlineUpload className="upload-icon" />
                <p className="upload-text">Click to upload or drag and drop</p>
                <p className="upload-info">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
                <input
                  type="file"
                  id="fileUpload"
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  onChange={previewMedia}
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h4 style={{ color: "#121528" }}>Campaign Target</h4>

          <div className="form-group">
            <div className="info-label">
              <label>Select Contribution Type</label>
              <IoInformationCircleOutline className="info-icon" />
            </div>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="contributionType"
                  value="flexible"
                  checked={campaign.contributionType === "flexible"}
                  onChange={handleInputChange}
                />
                <span className="radio-text">Flexible Contribution</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="contributionType"
                  value="fixed"
                  checked={campaign.contributionType === "fixed"}
                  onChange={handleInputChange}
                />
                <span className="radio-text">Fixed Contribution</span>
              </label>
            </div>
          </div>

          <div className="target">
            <label htmlFor="targetAmount">
              Campaign Target Amount<span className="required">*</span>
            </label>
            <div className="currency-input">
              <div className="currency">
                <span>NGN</span>
                <PiCaretDown />
              </div>
              <input
                type="number"
                id="targetAmount"
                name="targetAmount"
                placeholder="0.00"
                value={campaign.targetAmount}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="toggle-group">
            <label htmlFor="hasPaymentOptions">
              Split payment in categories
            </label>
            <label className="toggle">
              <input
                type="checkbox"
                id="hasPaymentOptions"
                name="hasPaymentOptions"
                checked={campaign.hasPaymentOptions}
                onChange={handleInputChange}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="form-group">
            <h4 style={{ color: "#121528" }}>Allow Pledges</h4>

            <div className="toggle-group">
              <label htmlFor="allowPledges">
                Allow others to pledge in this campaign
              </label>
              <label className="toggle">
                <input
                  type="checkbox"
                  id="allowOtherPledges"
                  name="allowOtherPledges"
                  checked={campaign.allowOtherPledges}
                  onChange={handleInputChange}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="toggle-group">
              <label htmlFor="isPublic">
                Allow campaign to be visible to the public
              </label>
              <label className="toggle">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  checked={campaign.isPublic}
                  onChange={handleInputChange}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onBack} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-create" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
