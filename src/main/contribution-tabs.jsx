import { useState, useEffect } from "react";
import { IoMdTime } from "react-icons/io";
import apiClient from "../api/utils";
import Loader from "../components/loader";

export default function ContributionsTab({ campaignId }) {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `/campaign/${campaignId}/contribution/all`
        );

        if (response.data && response.data.data) {
          setContributions(response.data.data.contributions || []);
          setMeta(response.data.data.meta || {});
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch contributions:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load contributions"
        );
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchContributions();
    }
  }, [campaignId]);

  const formatCurrency = (amount, currency = "NGN") => {
    return currency === "NGN"
      ? `₦${amount?.toLocaleString() || "0"}`
      : `${currency} ${amount?.toLocaleString() || "0"}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "SUCCESS":
        return "#39BD78";
      case "PENDING":
        return "#F59E0B";
      case "FAILED":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStatusBadge = (status) => (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        backgroundColor: `${getStatusColor(status)}20`,
        color: getStatusColor(status),
      }}
    >
      {status?.toUpperCase() || "UNKNOWN"}
    </span>
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: "#EF4444",
        }}
      >
        <h4>Error loading contributions</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!contributions || contributions.length === 0) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#6B7280",
        }}
      >
        <h4>No contributions yet</h4>
        <p>Be the first to contribute to this campaign!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#F8FAFC",
          borderRadius: "8px",
        }}
      >
        <div>
          <h4 style={{ margin: "0 0 5px 0", color: "#1F2937" }}>
            Total Contributions
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "bold",
              color: "#39BD78",
            }}
          >
            {meta.total || contributions.length}
          </p>
        </div>
        <div>
          <h4 style={{ margin: "0 0 5px 0", color: "#1F2937" }}>
            Total Amount
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "bold",
              color: "#328BE0",
            }}
          >
            {formatCurrency(
              contributions.reduce(
                (sum, contrib) => sum + (contrib.amount || 0),
                0
              )
            )}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {contributions.map((contribution) => (
          <div
            key={contribution.id}
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "#FFFFFF",
              transition: "box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "12px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#328BE0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {contribution.meta?.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#1F2937" }}>
                    {contribution.meta?.name || "Anonymous"}
                  </h4>
                  <p style={{ margin: 0, color: "#6B7280", fontSize: "14px" }}>
                    {contribution.userData?.email ||
                      contribution.meta?.email ||
                      "No email provided"}
                  </p>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#39BD78",
                  }}
                >
                  {formatCurrency(contribution.amount, contribution.currency)}
                </p>
                {getStatusBadge(contribution.status)}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "12px",
                borderTop: "1px solid #F3F4F6",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#6B7280",
                    fontSize: "14px",
                  }}
                >
                  <IoMdTime size={16} />
                  {formatDate(contribution.createdAt)}
                </span>

                <span
                  style={{
                    color: "#6B7280",
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                >
                  via {contribution.provider || "Unknown"}
                </span>
              </div>

              {contribution.meta?.comment && (
                <span
                  style={{
                    color: "#374151",
                    fontSize: "14px",
                    fontStyle: "italic",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  "{contribution.meta.comment}"
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {meta.total > contributions.length && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#6B7280",
          }}
        >
          Showing {contributions.length} of {meta.total} contributions
        </div>
      )}
    </div>
  );
}
