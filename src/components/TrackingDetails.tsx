import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDateArabic } from '../utils/dateFormatter';
import './TrackingDetails.css';

const TrackingDetails: React.FC = () => {
  const { currentStatus, trackingNumber, provider, timestamp, promisedDate, statusHistory, loading, error, createDate } = useSelector((state: RootState) => state.tracking);

  if (loading) {
    return <div className="loading">جاري التحميل<span className="loading-dots">...</span></div>;
  }

  if (error) {
    return <div className="error">حدث خطأ: {error}</div>;
  }

  if (!trackingNumber) {
    return null;
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'green';
      case 'IN_TRANSIT':
        return 'yellow';
      case 'OUT_FOR_DELIVERY':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getArabicStatus = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'تم التسليم';
      case 'IN_TRANSIT':
        return 'جاري النقل';
      case 'OUT_FOR_DELIVERY':
        return 'خرج للتسليم';
      case 'CREATED':
        return 'تم إنشاء الشحنة';
      default:
        return 'غير معروف';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircle className="status-icon" />;
      case 'IN_TRANSIT':
        return <Truck className="status-icon" />;
      case 'OUT_FOR_DELIVERY':
        return <Package className="status-icon" />;
      default:
        return <AlertCircle className="status-icon" />;
    }
  };


  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

  const steps = [
    { status: 'CREATED', label: 'تم إنشاء الشحنة', icon: <AlertCircle /> },
    { status: 'IN_TRANSIT', label: 'تم استلام الشحنة من التاجر', icon: <Package /> },
    { status: 'OUT_FOR_DELIVERY', label: 'الشحنة خرجت للتسليم', icon: <Truck /> },
    { status: 'DELIVERED', label: 'تم التسليم', icon: <CheckCircle /> },
  ];

  const currentStepIndex = steps.findIndex(step => step.status === currentStatus);

  return (
    <div className="tracking-details">
      <div className="tracking-summary">
        <div className="summary-item">
          <h3>رقم الشحنة</h3>
          <p>{trackingNumber}</p>
        </div>
        <div className="summary-item">
          <h3>آخر تحديث</h3>
          <p>{timestamp ? formatDateArabic(timestamp) : 'غير متوفر'}</p>
        </div>
        <div className="summary-item">
          <h3>اسم التاجر</h3>
          <p>{provider || 'غير محدد'}</p>
        </div>
        <div className="summary-item">
          <h3>موعد التسليم خلال</h3>
          <p>{promisedDate ? formatDateArabic(promisedDate) : 'غير محدد'}</p>
        </div>
      </div>

      <div className="tracking-timeline">
        {steps.map((step, index) => (
          <div 
            key={step.status} 
            className={`timeline-step ${index <= currentStepIndex ? 'completed' : ''} ${index === currentStepIndex ? 'active' : ''}`}
          >
            <div className="step-icon">
              {index < currentStepIndex ? <CheckCircle /> : step.icon}
            </div>
            <p>{step.label}</p>
          </div>
        ))}
      </div>
      <div className="tracking-details-container">

      <div className="tracking-history">
        <h3>تفاصيل الشحنة</h3>
        {(createDate || (statusHistory && statusHistory.length > 0)) ? (
          <table>
            <thead>
              <tr>
                <th>الفرع</th>
                <th>التاريخ والوقت</th>
                <th>التفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {createDate && (
                <tr>
                  <td>مدينة نصر</td>
                  <td>{formatDateArabic(createDate)}</td>
                  <td>تم إنشاء الشحنة</td>
                </tr>
              )}
              {statusHistory && statusHistory.map((event, index) => (
                <tr key={index}>
                  <td>{event.hub || 'غير محدد'}</td>
                  <td>{formatDateArabic(event.timestamp)}</td>
                  <td>{getArabicStatus(event.state)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">لا توجد بيانات متاحة للشحنة</p>
        )}
      </div>

      <div className="additional-info">
        <h3>معلومات إضافية</h3>
        <p>إذا كانت لديك أي استفسارات حول شحنتك، يرجى الاتصال بخدمة العملاء على الرقم: 19034</p>
        <p>ساعات العمل: من الأحد إلى الخميس، 9 صباحًا - 5 مساءً</p>
      </div>
    </div>
    </div>
  );
};

export default TrackingDetails;

