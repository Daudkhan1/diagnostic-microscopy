import { useState, useEffect } from "react";
import { Collapse as AntdCollapse } from "antd";

import {
  ShaperSquareIcon,
  ShaperEclipseIcon,
  ShaperPolygonIcon,
} from "../../../assets/svg";
import avatar from "../../../assets/avatar.png";
// import { organColorMap } from "@/constants";

import "./styles.scss";

const Collapse = ({ annotationDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveKey] = useState([]);
  const annotationObj = JSON.parse(annotationDetail);
  console.log("Annotation converted",annotationObj);


  const getShapeIcon = (shape) => {
    switch (shape) {
      case "rectangle":
        return <ShaperSquareIcon />;
      case "ellipse":
        return <ShaperEclipseIcon />;
      case "polygon":
        return <ShaperPolygonIcon />;
      default:
        return "";
    }
  };

  useEffect(() => {
    if (annotationDetail.biologicalType) {
      setIsOpen(true);
      setActiveKey(["1"]);
    } else {
      setActiveKey(["1"]);
      setIsOpen(false);
    }
  }, [annotationDetail]);

  return (
    <div className="slide-details-container">
      {/* <div className="collapse-inner"> */}
      <AntdCollapse
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={[
          {
            key: "1",
            label: (
              <span className="annotation-label">
                {isOpen ? "Annotation Details" : "Slide Details"}
              </span>
            ),
            children: isOpen ? (
              <div>
                <article className="annotation-table">
                  <header className="row-section">
                    <span className="table-heading">Shape</span>
                    <span className="table-heading">Name</span>
                    <span className="table-heading">Type</span>
                  </header>

                  <section className="row-section">
                    <span className="table-cell shape-box">
                      {getShapeIcon(annotationDetail?.shape)}
                      <b>{annotationDetail?.shape || "No Shape"}</b>
                    </span>

                    <span className="table-cell">
                      <b>{annotationDetail?.name || "N/A"}</b>
                    </span>

                    <span className="table-cell">
                      (<b>{annotationDetail?.biologicalType || "N/A"}</b>)
                    </span>
                  </section>
                </article>

                <section className="description-container">
                  <header className="description-heading">Description</header>

                  <p className="description-text">
                    {annotationDetail?.description ||
                      "No description available"}
                  </p>
                </section>

                <div className="annotation-detail-section">
                  <section className="search-info">
                    <div className="search-details-container">
                      {annotationDetail?.annotationType === "MANUAL" && (
                        <div className="annotated-box">
                          <p className="annotation-text">Annotated by</p>

                          <div className="search-details">
                            <img
                              src={avatar}
                              className="search-avatar"
                              alt="user-icon"
                            />

                            <div className="search-info">
                              <p className="annotator-name">
                                {annotationDetail.annotatedBy}
                              </p>

                              <p className="annotator-designation">
                                {annotationDetail.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            ) : (
              <div>
                <article className="annotation-table-complete">
                  <header className="annotation-section">
                    {/* <span className="annotation-heading">Status</span> */}
                    <span className="annotation-heading">AI Annotations</span>
                    {/* <span className="annotation-heading">Case ID</span> */}
                    {/* <span className="annotation-heading">Organ</span> */}
                    <span className="annotation-heading">Threshold Level</span>
                  </header>

                  <section className="annotation-section">
                    {/* <span className="annotation-heading status-box">
                      {annotationDetail?.status || "N/A"}
                    </span> */}

                    {/* <span className="annotation-heading annotation-count-color">
                      {annotationDetail?.annotations ?? 0}
                    </span> */}

                    <span className="annotation-heading ai-annotation-count-color">
                      {/* {annotationDetail?.aiAnnotations ?? 23} */}
                      {(annotationObj?.mitotic?.length ?? 0) + (annotationObj?.maybe_mitotic?.length ?? 0)}
                    </span>

                    {/* <span className="annotation-heading case-id">
                      {annotationDetail?.caseId || "N/A"}
                    </span> */}

                    {/* {annotationDetail?.organ && (
                      <div className="organ-list">
                        <span
                          className={`status-box status-box-${
                            organColorMap[
                              annotationDetail.organ.toLowerCase()
                            ] ?? Object.keys(organColorMap).length % 5
                          }`}
                        >
                          {annotationDetail.organ}
                        </span>
                      </div>
                    )} */}
                  </section>
                </article>

                {annotationDetail?.status === "COMPLETED" && (
                  <div className="annotation-detail-section">
                    <section className="search-info">
                      <div className="search-details-container">
                        {annotationDetail?.annotationsDetails?.map(
                          (detail, index) => (
                            <div className="annotated-box" key={index}>
                              <p className="annotation-text">Annotated by</p>

                              <div className="search-details">
                                <img
                                  src={avatar}
                                  className="search-avatar"
                                  alt="user-icon"
                                />

                                <div className="search-info">
                                  <p className="annotator-name">
                                    {detail.annotatedBy}
                                  </p>

                                  <p className="annotator-designation">
                                    {detail.role}
                                  </p>
                                </div>

                                <div className="search-info">
                                  <p className="annotator-designation">
                                    Annotation
                                  </p>

                                  <p className="annotator-name">
                                    {detail.annotationCount ?? 0}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </section>
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />
      </div>
    // </div>
  );
};

export default Collapse;
